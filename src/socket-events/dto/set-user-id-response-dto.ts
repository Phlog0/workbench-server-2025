import { IsBoolean, IsNumber, Min } from "class-validator";

export class SetUserIdResponseDto {
  @IsBoolean()
  success: boolean;
  @IsNumber()
  userId: number;
  @IsNumber()
  @Min(0)
  onlineCount: number;
  @IsNumber()
  @Min(0)
  userConnectionsCount: number;
}
