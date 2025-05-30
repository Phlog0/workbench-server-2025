import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import { AuthGuard } from "./auth.guard";
import { Request } from "express";
import { SkipAuth } from "./decorators/skip-auth.decorator";

interface MyRequest extends Request {
  user: { sub: number; email: string; iat: number; exp: number };
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req: MyRequest) {
    return req.user;
  }
}
