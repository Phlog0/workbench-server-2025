import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Param,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { LoginDto } from "./dto/login.dto";
import { SkipAuth } from "./decorators/skip-auth.decorator";
import { RegisterDto } from "./dto/register.dto";
import { Request, Response } from "express";

interface ExtendedExpressRequest extends Request {
  user: { sub: number; email: string; iat: number; exp: number };
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SkipAuth()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const userData = await this.authService.login(loginDto);
    // response.cookie("token", access_token, { httpOnly: true, secure: true, sameSite: "strict" });
    response.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure:true ДЛЯ HTTPS
    });

    return response.json({ user: userData.user, accessToken: userData.accessToken });
  }
  @SkipAuth()
  @Post("verifyUser")
  @HttpCode(HttpStatus.OK)
  async verifyUser(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies["refreshToken"];

    console.log({
      sendedToken: refreshToken,
    });
    if (!refreshToken || typeof refreshToken !== "string") {
      throw new UnauthorizedException("Вы не авторизованы");
    }
    const userData = await this.authService.verifyUser(refreshToken);
    return response.json(userData);
  }

  @SkipAuth()
  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() registerDto: RegisterDto, @Res() response: Response) {
    const userData = await this.authService.registration(registerDto);
    // response.cookie("token", access_token, { httpOnly: true, secure: true, sameSite: "strict" });
    response.cookie("refreshToken", userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      // secure:true ДЛЯ HTTPS
    });
    return response.json({ user: userData.user, accessToken: userData.accessToken });
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: Request, @Res() response: Response) {
    const cookies = request.cookies;
    if ("refreshToken" in cookies) {
      const token = await this.authService.logout(cookies.refreshToken);
      response.clearCookie("refreshToken");
      return response.json(token);
    }
    throw new UnauthorizedException("Нет кук");
  }

  @SkipAuth()
  @Get("refresh")
  @HttpCode(HttpStatus.CREATED)
  async refresh(@Req() request: Request, @Res() response: Response) {
    const cookies = request.cookies;
    if ("refreshToken" in cookies) {
      const userData = await this.authService.refresh(cookies.refreshToken);
      response.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return response.json(userData);
    }
    throw new UnauthorizedException("Пользователь не авторизован");
  }

  @SkipAuth()
  @Get("activate/:activationLink")
  @HttpCode(HttpStatus.CREATED)
  async activate(@Param("activationLink") activationLink: string, @Res() response: Response) {
    await this.authService.activate(activationLink);
    return response.redirect(process.env.CLIENT_URL + "/login" + "?activated=" + activationLink);
  }

  // @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req: ExtendedExpressRequest) {
    return req.user;
  }
}
