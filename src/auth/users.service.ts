import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { User as UserModel } from "@prisma/client";
import * as bcrypt from "bcryptjs";
type CreateUserArgs = { email: string; firstName: string; password: string; secondName: string };
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string, password: string): Promise<UserModel> {
    if (!email || !password) throw new NotFoundException("Неполные данные");
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }

  async createUser(createUserDto: CreateUserArgs): Promise<UserModel> {
    const isUserExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (isUserExist) throw new ConflictException("Данный email уже используется");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);
    const createdUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
    return createdUser;
  }
}
