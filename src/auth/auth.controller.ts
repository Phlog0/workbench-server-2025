import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Redirect,
  Res,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import { AuthGuard } from "./auth.guard";
import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { SkipAuth } from "./decorators/skip-auth.decorator";
import { SignUpAuthDto } from "./dto/sign-up-auth.dto";
import { IApiResponse, PartialApiResponse } from "src/shared/interceptors/api-response.interface";

interface ExtendedExpressRequest extends Request {
  user: { sub: number; email: string; iat: number; exp: number };
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  async signIn(
    @Body() signInAuthDto: SignInAuthDto,
    @Res({ passthrough: true }) response: ExpressResponse,
    @Req() req: ExtendedExpressRequest,
  ) {
    const access_token = await this.authService.signIn(signInAuthDto);
    //!refresh token res.cookie
    // response.cookie("token", access_token, { httpOnly: true, secure: true, sameSite: "strict" });
    return {
      message: "Вход выполнен",

      access_token,
    };
  }
  @SkipAuth()
  @Post("sign-up")
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    const access_token = await this.authService.signUp(signUpAuthDto);
    // response.cookie("token", access_token, { httpOnly: true, secure: true, sameSite: "strict" });
    return { message: "Пользователь успешно зарегестрирован", access_token };
  }

  // @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req: ExtendedExpressRequest) {
    return req.user;
  }
}
