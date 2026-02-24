import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { SKIP_AUTH_KEY } from "./decorators/skip-auth.decorator";
import { TokenService } from "./services/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException("Вы не авторизованы");
    try {
      const payload = await this.tokenService.validateAccessToken(token);
      if (!payload) {
        throw new UnauthorizedException("Вы не авторизованы");
      }
      request["user"] = payload;
    } catch {
      throw new UnauthorizedException("Вы не авторизованы");
    }
    return true;
  }
}
