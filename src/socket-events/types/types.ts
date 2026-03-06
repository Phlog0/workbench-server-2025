import { User } from "@/generated/prisma/client";
export type ClientId = string;
export type UserId = User["id"];
export type SocketConnection = { socketId: string; connectedAt: Date };
export type OnlineUsers = Map<UserId, SocketConnection[]>;

export type SocketsToUser = Map<ClientId, UserId>;
