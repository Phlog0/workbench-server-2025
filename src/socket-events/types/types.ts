export type SocketConnection = { socketId: string; connectedAt: Date };
export type OnlineUsers = Map<string, SocketConnection[]>;
