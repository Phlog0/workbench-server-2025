import { ApiProperty } from "@nestjs/swagger";
import { User } from "@/generated/prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
    @ApiProperty({ example: "test@test.com", description: "Почта пользователя" })
    @IsString()
    email: string;
    @ApiProperty({
        example: new Date(),
        required: false,
        nullable: true,
        description: "Дата активации акаунта",
    })
    @IsOptional()
    activated?: Date | null;
    @ApiProperty({ example: 1 })
    @IsNumber()
    id: number;
    @ApiProperty({ example: "Sergio" })
    @IsString()
    firstName: string;
    @ApiProperty({ example: "Sergiov" })
    @IsString()
    secondName: string;
    @ApiProperty({
        example: "https://phlog0-portfolio.ru",
        description: "Ссылка на аватар",
        required: false,
        nullable: true,
    })
    @IsString()
    @IsOptional()
    avatar?: string | null;
    constructor(model: User) {
        this.email = model.email;
        this.activated = model.activated;
        this.id = model.id;
        this.firstName = model.firstName;
        this.secondName = model.secondName;
        this.avatar = model.avatar;
    }
}
