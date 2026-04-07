import { ApiProperty } from "@nestjs/swagger";

import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: "Пароль должен быть больше 6 символов",
    })
    @MaxLength(24, {
        message: "Пароль должен быть не больше 24 символов",
    })
    @ApiProperty({
        type: String,
        examples: {
            first: "password123",
            second: "password1234",
            third: "password12345",
        },
    })
    password: string;
    @IsString()
    @IsEmail({}, { message: "Введите корректный email адресс" })
    @ApiProperty({ type: String, example: "test@test.com" })
    email: string;
}
