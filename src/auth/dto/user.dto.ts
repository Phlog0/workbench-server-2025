import { ApiProperty } from "@nestjs/swagger";
import { User } from "@/generated/prisma/client";
import { IsOptional, IsString } from "class-validator";

export class UserDto {
    @ApiProperty({
        example: "test@test.com",
        description: "Почта пользователя",
    })
    @IsString()
    email: string;

    @ApiProperty({
        example: new Date(),
        required: false,
        description: "Дата активации акаунта",
    })
    @IsOptional()
    activated?: Date | null;

    @ApiProperty({ example: "iasfa-fdsafasdf-g" })
    @IsString()
    id: string;

    @ApiProperty({ example: "Sergio" })
    @IsString()
    name: string;

    @ApiProperty({ example: "Sergiov" })
    @IsString()
    lastName: string;

    @ApiProperty({ example: "Sergeevich" })
    @IsString()
    @IsOptional()
    middleName?: string;

    @ApiProperty({
        example: "https://phlog0-portfolio.ru",
        description: "Ссылка на аватар",
        required: false,
    })
    @IsString()
    @IsOptional()
    avatar?: string | null;

    constructor(model: User) {
        this.email = model.email;
        this.activated = model.activated;
        this.id = model.id;
        this.name = model.name;
        this.lastName = model.lastName;
        this.avatar = model.avatar;
    }
}
