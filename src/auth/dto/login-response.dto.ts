import { IsString } from "class-validator";
import { UserDto } from "./user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDto {
    @ApiProperty({ type: UserDto })
    user: UserDto;
    @IsString()
    @ApiProperty({ example: "eyJhtoken-123" })
    accessToken: string;
}
