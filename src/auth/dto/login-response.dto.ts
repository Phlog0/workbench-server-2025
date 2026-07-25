import { IsString, ValidateNested } from "class-validator";
import { UserDto } from "./user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class LoginResponseDto {
    @ApiProperty({ type: UserDto })
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto;

    @ApiProperty({ example: "eyJhtoken-123" })
    @IsString()
    accessToken: string;
}
