import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MailService } from "./mail.service";
import { TokenService } from "./token.service";
import { UserDto } from "../dto/user.dto";
import { RegisterDto } from "../dto/register.dto";
import { PrismaService } from "@/prisma.service";
import { LoginDto } from "../dto/login.dto";
import * as bcrypt from "bcryptjs";
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private prismaService: PrismaService,
    // private jwtService: JwtService,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const findUser = await this.prismaService.user.findUnique({ where: { email: loginDto.email } });

    if (!findUser) {
      throw new BadRequestException("Пользователь с таким email не найден");
    }
    const isPasswordsEqual = await bcrypt.compare(loginDto.password, findUser.password);
    if (!isPasswordsEqual) {
      throw new BadRequestException("Неверный пароль");
    }

    const userDto = new UserDto({ ...findUser });
    const tokens = await this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async verifyUser(refreshToken: string) {
    const findToken = await this.prismaService.refreshToken.findFirst({
      where: {
        token: refreshToken,
      },
    });

    if (!findToken) {
      throw new UnauthorizedException("Вы не авторизованы");
    }

    const findUser = await this.prismaService.user.findUnique({
      where: { id: findToken.userId },
    });

    const userDto = new UserDto({ ...findUser });

    return {
      user: userDto,
    };
  }

  async registration(body: RegisterDto) {
    const { activationLink, createdUser } = await this.userService.createUser(body);
    await this.mailService.sendActivationLink(
      createdUser.email,
      `${process.env.SERVER_URL}/api/auth/activate/${activationLink.link}`,
    );
    const userDto = new UserDto(createdUser);
    const tokens = await this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { user: userDto, ...tokens };
  }

  async activate(activationLink: string) {
    const findLink = await this.prismaService.activationLink.findFirst({
      where: { link: activationLink },
    });

    if (!findLink) {
      throw new BadRequestException("Ссылка не найдена");
    }
    await this.prismaService.user.update({
      data: {
        activated: new Date(),
      },
      where: {
        id: findLink.userId,
      },
    });
    await this.prismaService.activationLink.delete({ where: { id: findLink.id } });
  }

  async logout(token: string) {
    const deletedToken = await this.tokenService.removeToken(token);
    return deletedToken;
  }

  async refresh(token: string) {
    const userData = await this.tokenService.validateRefreshToken(token);
    const findToken = await this.tokenService.findToken(token);
    if (!userData || !findToken) {
      throw new UnauthorizedException();
    }
    const findUser = await this.prismaService.user.findUnique({ where: { id: findToken.userId } });
    const userDto = new UserDto(findUser);
    const tokens = await this.tokenService.generateTokens({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}
