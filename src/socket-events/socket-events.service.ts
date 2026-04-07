import { Injectable } from "@nestjs/common";
import { ClientId, UserId } from "./types/types";
import { PrismaService } from "@/prisma.service";
import { Project } from "@/generated/prisma/client";

@Injectable()
export class SocketEventsService {
    constructor(private prismaService: PrismaService) {}

    async kickAllFromRoom(projectId: Project["id"], socketIds: string[]) {
        if (socketIds) {
            for (const socketId of socketIds) {
                console.log({ projectId, socketId });
                await this.leaveRoom(projectId, socketId);
            }
        }
    }

    async setUserId(clientId: ClientId, userId: UserId) {
        const connections = await this.prismaService.socket.findMany({
            where: {
                userId,
            },
        });
        if (connections) {
            const existingConnection = await this.prismaService.socket.findUnique({
                where: {
                    id: clientId,
                },
            });
            if (existingConnection) {
                return;
            }
        }
        await this.prismaService.socket.create({
            data: {
                userId: userId,
                id: clientId,
            },
        });
        await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                isOnline: true,
            },
        });
    }

    async broadcastOnlineCount(userId: UserId) {
        return await this.prismaService.user.findMany({
            where: {
                isOnline: true,
            },
            include: {
                socket: {
                    where: {
                        userId,
                    },
                },
            },
        });
    }

    async socketDisconnected(clientId: ClientId) {
        const existingSocketToDelete = await this.prismaService.socket.findUnique({
            where: {
                id: clientId,
            },
        });

        if (!existingSocketToDelete) {
            return;
        }
        const deletedSocket = await this.prismaService.socket.delete({
            where: {
                id: clientId,
            },
        });

        const reaminingSockets = await this.prismaService.socket.findMany({
            where: {
                userId: deletedSocket.userId,
            },
        });

        if (!reaminingSockets.length) {
            await this.prismaService.user.update({
                where: {
                    id: deletedSocket.userId,
                },
                data: {
                    isOnline: false,
                },
            });
        }
        return deletedSocket.userId;
    }
    async userLogout(userId: UserId) {
        await this.prismaService.socket.deleteMany({
            where: {
                userId,
            },
        });
        await this.prismaService.user.update({
            where: {
                id: userId,
            },
            data: {
                isOnline: false,
            },
        });
    }

    async joinRoom(userId: UserId, projectId: Project["id"], clientId: ClientId) {
        try {
            const now = new Date();
            return await this.prismaService.$transaction(async (tx) => {
                const existing = await tx.socket.findUnique({
                    where: {
                        id: clientId,
                    },
                });

                if (existing) {
                    return await tx.socket.update({
                        where: {
                            id: clientId,
                        },
                        data: {
                            joinedAt: existing.leftAt ? now : existing.joinedAt,
                            leftAt: null,
                            projectId,
                        },
                    });
                } else {
                    return await tx.socket.create({
                        data: {
                            projectId,
                            joinedAt: now,
                            leftAt: null,
                            id: clientId,
                            userId,
                        },
                    });
                }
            });
        } catch (error) {
            console.error("[SOCKET_SERVICE_joinRoom]: ", error);
        }
    }
    async getOnlineCountInRoom(projectId: Project["id"]) {
        return await this.prismaService.socket.findMany({
            where: {
                projectId,
            },
        });
    }
    async leaveRoom(projectId: Project["id"], clientId: ClientId) {
        const now = new Date();

        const existingUser = await this.prismaService.socket.findUnique({
            where: {
                id: clientId,
                projectId,
            },
        });
        if (!existingUser) {
            console.error("[SOCKET_SERVICE_LEAVE_ROOM]: ", existingUser);
            return;
        }
        return await this.prismaService.socket.update({
            where: {
                id: clientId,
                projectId,
            },
            data: {
                leftAt: now,
                projectId: null,
            },
        });
    }
}
