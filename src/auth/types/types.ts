import { UserDto } from "../dto/user.dto";

export type RequestUser = UserDto & { iat: number; exp: number };
export interface ExtendedExpressRequest extends Request {
    user: RequestUser;
}
