import { ApiProperty } from "@nestjs/swagger";
import {
    IsEmail,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from "class-validator";

export class RegisterDto {
    @ApiProperty({ type: String, example: "Сергей" })
    @IsString()
    name: string;

    @ApiProperty({ type: String, example: "Сергеев" })
    @IsString()
    lastName: string;

    @ApiProperty({ type: String, example: "Сергеев" })
    @IsOptional()
    @IsString()
    secondName: string;

    @ApiProperty({ type: String, example: "password123" })
    @IsString()
    @MinLength(6, {
        message: "Пароль должен быть больше 6 символов",
    })
    @MaxLength(24, {
        message: "Пароль должен быть не больше 24 символов",
    })
    password: string;

    @ApiProperty({ type: String, example: "test@test.com" })
    @IsEmail()
    email: string;
}
