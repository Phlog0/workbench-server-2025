import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsString, IsEmail, MinLength, MaxLength, IsEmpty, IsNotEmpty } from "class-validator";

export class GetUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6, {
    message: "Пароль должен быть больше 6 символов",
  })
  @MaxLength(24, {
    message: "Пароль должен быть не больше 24 символов",
  })
  password: string;
}
