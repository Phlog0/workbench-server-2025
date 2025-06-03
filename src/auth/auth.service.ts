import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { SignUpAuthDto } from "./dto/sign-up-auth.dto";
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto): Promise<{ access_token: string }> {
    const { email, password } = signInAuthDto;
    const user = await this.userService.getUser(email, password);

    if (!user) throw new NotFoundException("Пользователь не найден");

    const isPasswordTrue = bcrypt.compareSync(signInAuthDto.password, user.password);
    if (!isPasswordTrue) throw new UnauthorizedException("Неверный пароль");

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpAuthDto: SignUpAuthDto) {
    try {
      const { email, password } = signUpAuthDto;
      const createdUser = await this.userService.createUser(signUpAuthDto);
      return await this.signIn({ email: createdUser.email, password: password });
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
    }
  }
}
