import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
import { User as UserModel } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
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

  async createUser(createUserDto: CreateUserArgs) {
    const isUserExist = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (isUserExist) {
      throw new BadRequestException("Данный email уже используется");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);
    const newLink = randomUUID();
    const createdUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
    const activationLink = await this.prisma.activationLink.create({
      data: { link: newLink, userId: createdUser.id },
    });
    return { createdUser, activationLink };
  }
}
