import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @ApiProperty({ type: String, example: "Иван" })
  firstName: string;
  @IsString()
  @ApiProperty({ type: String, example: "Иванов" })
  secondName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: "Пароль должен быть больше 6 символов",
  })
  @MaxLength(24, {
    message: "Пароль должен быть не больше 24 символов",
  })
  @ApiProperty({ type: String, example: "password123" })
  password: string;
  @IsString()
  @IsEmail()
  @ApiProperty({ type: String, example: "test@test.com" })
  email: string;
}
