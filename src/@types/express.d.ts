import { UserDto } from "@/auth/dto/user.dto";
import { RequestUser } from "./request-user.interface";

export type RequestUser = UserDto & { iat: number; exp: number };
declare global {
    namespace Express {
        interface Request {
            user: RequestUser;
        }
    }
}

export {};
