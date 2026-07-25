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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { LoginResponseDto } from "./dto/login-response.dto";
import { UserDto } from "./dto/user.dto";
import { RequestUser } from "@/@types/express";

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
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
    ) {
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
        description:
            "На клиенте это нужно, чтобы сразу редиректить пользователя на projects-menu",
    })
    @ApiResponse({
        type: UserDto,
        status: HttpStatus.OK,
    })
    @HttpCode(HttpStatus.OK)
    async verifyUser(@Req() request: Request) {
        const refreshToken: unknown = request.cookies["refreshToken"];

        if (!refreshToken || typeof refreshToken !== "string") {
            throw new UnauthorizedException("Вы не авторизованы");
        }
        const user = await this.authService.verifyUser(refreshToken);
        return { user };
    }

    @SkipAuth()
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async registration(
        @Body() registerDto: RegisterDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const userData = await this.authService.register(registerDto);

        response.cookie("refreshToken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            // secure:true ДЛЯ HTTPS
            // sameSite: "strict"
        });
        // TODO
        return response.json({
            user: userData.user,
            accessToken: userData.accessToken,
        });
    }

    @Post("logout")
    @HttpCode(HttpStatus.OK)
    async logout(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken: unknown = request.cookies["refreshToken"];
        if (typeof refreshToken === "string") {
            const token = await this.authService.logout(refreshToken);
            response.clearCookie("refreshToken");
            // TODO Что это ваще?
            return response.json(token);
        } else {
            throw new UnauthorizedException("Нет кук");
        }
    }

    @SkipAuth()
    @Get("refresh")
    @HttpCode(HttpStatus.CREATED)
    async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken: unknown = request.cookies["refreshToken"];
        if (typeof refreshToken === "string") {
            const userData = await this.authService.refresh(refreshToken);
            response.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            // TODO
            return response.json(userData);
        }
        throw new UnauthorizedException("Пользователь не авторизован");
    }

    @SkipAuth()
    @Get("activate/:activationLink")
    @HttpCode(HttpStatus.CREATED)
    async activate(
        @Param("activationLink") activationLink: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        await this.authService.activate(activationLink);
        return response.redirect(
            process.env.CLIENT_URL + "/login" + "?activated=" + activationLink,
        );
    }

    // @UseGuards(AuthGuard)
    @Get("profile")
    // TODO декоратор вместо as
    getProfile(@Req() req: Request) {
        const user = req.user as RequestUser;
        return user;
    }
}
