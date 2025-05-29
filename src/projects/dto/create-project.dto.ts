import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator"

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    info: string


}
