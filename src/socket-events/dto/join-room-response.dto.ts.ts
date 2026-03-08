import { Project, Socket, User } from "@/generated/prisma/client";
import { IsArray, IsBoolean, IsNumber, Min } from "class-validator";
import { OnlineUsers } from "../types/types";

export class JoinRoomResponseDto {
  @IsBoolean()
  success: boolean;
  @IsNumber()
  projectId: Project["id"];

  @IsArray()
  onlineUsers: Socket[];
}
