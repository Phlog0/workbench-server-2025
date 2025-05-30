import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";
import { User as UserModel, Prisma } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { GetUserDto } from "./dto/get-user.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt);
    const createdUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hashedPassword },
    });
    return createdUser;
  }

  async getUser(getUserDto: GetUserDto) {
    const { email, password } = getUserDto;
    if (!email || !password) throw new NotFoundException("Неполные данные");
    const user = await this.prisma.user.findUnique({
      where: { email: getUserDto.email },
    });

    return user;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  removeUser(id: number) {
    return `This action removes a #${id} user`;
  }
}
