import { User } from "@prisma/client";

export class UserDto {
  email: string;
  activated?: Date;
  id: number;
  constructor(model: User) {
    this.email = model.email;
    this.activated = model.activated;
    this.id = model.id;
  }
}
