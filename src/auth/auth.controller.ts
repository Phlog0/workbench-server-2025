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
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import { AuthGuard } from "./auth.guard";
import { Request } from "express";
import { SkipAuth } from "./decorators/skip-auth.decorator";
import { SignUpAuthDto } from "./dto/sign-up-auth.dto";

interface MyRequest extends Request {
  user: { sub: number; email: string; iat: number; exp: number };
}
@SkipAuth()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("sign-in")
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Post("sign-up")
  @Redirect()
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUp(signUpAuthDto);
  }

  // @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Req() req: MyRequest) {
    return req.user;
  }
}
