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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginResponseDto } from "./dto/login-response.dto";
import { UserDto } from "./dto/user.dto";
import { ExtendedExpressRequest } from "./types/types";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @SkipAuth()
    @Post("login")
    @ApiOperation({
        summary: "Авторизация пользователя",
        description: "Осуществляет авторизацию пользователя",
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Успешная авторизация",
        type: LoginResponseDto,
    })
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
        const userData = await this.authService.login(loginDto);

        response.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure:true ДЛЯ HTTPS
        });

        return { user: userData.user, accessToken: userData.accessToken };
    }
    @SkipAuth()
    @Post("verifyUser")
    @ApiOperation({
        summary: "Подтверждение пользователя",
        description: "На клиенте это нужно, чтобы сразу редиректить пользователя на projects-menu",
    })
    @ApiResponse({
        type: UserDto,
        status: HttpStatus.OK,
    })
    @HttpCode(HttpStatus.OK)
    async verifyUser(@Req() request: Request) {
        const refreshToken = request.cookies["refreshToken"];

        if (!refreshToken || typeof refreshToken !== "string") {
            throw new UnauthorizedException("Вы не авторизованы");
        }
        const user = await this.authService.verifyUser(refreshToken);
        return { user };
    }

    @SkipAuth()
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async registration(@Body() registerDto: RegisterDto, @Res() response: Response) {
        const userData = await this.authService.registration(registerDto);

        response.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure:true ДЛЯ HTTPS
            // sameSite: "strict"
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
        return response.redirect(
            process.env.CLIENT_URL + "/login" + "?activated=" + activationLink,
        );
    }

    // @UseGuards(AuthGuard)
    @Get("profile")
    getProfile(@Req() req: ExtendedExpressRequest) {
        return req.user;
    }
}
