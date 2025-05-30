import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  secondName: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: "Пароль должен быть больше 6 символов",
  })
  @MaxLength(24, {
    message: "Пароль должен быть не больше 24 символов",
  })
  password: string;
  @IsString()
  @IsEmail()
  email: string;
}
