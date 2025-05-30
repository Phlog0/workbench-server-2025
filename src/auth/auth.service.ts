import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignInAuthDto } from "./dto/sign-in-auth.dto";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto): Promise<{ access_token: string }> {
    const user = await this.userService.getUser(signInAuthDto);

    if (!user) throw new NotFoundException("Пользователь не найден");

    const isPasswordTrue = bcrypt.compareSync(signInAuthDto.password, user.password);
    if (!isPasswordTrue) throw new UnauthorizedException("Неверный пароль");

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
