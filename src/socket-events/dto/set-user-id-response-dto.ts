import { IsBoolean, IsNumber, Min } from "class-validator";

export class SetUserIdResponseDto {
    @IsBoolean()
    success: boolean;
}
