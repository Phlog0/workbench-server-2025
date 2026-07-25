import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "@/prisma.service";
// TODO allowSynthetic...
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { RegisterDto } from "../dto/register.dto";
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async getUser(email: string, password: string) {
        if (!email || !password) throw new NotFoundException("Неполные данные");
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        return user;
    }

    async createUser(dto: RegisterDto) {
        const isUserExist = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (isUserExist) {
            throw new BadRequestException("Данный email уже используется");
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(dto.password, salt);
        const newLink = randomUUID();
        const createdUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                lastName: dto.lastName,
                name: dto.name,
                secondName: dto.secondName,
            },
        });
        const activationLink = await this.prisma.activationLink.create({
            data: { link: newLink, userId: createdUser.id },
        });
        return { createdUser, activationLink };
    }
}
