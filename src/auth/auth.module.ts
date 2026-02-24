import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersService } from "./services/users.service";
import { PrismaService } from "@/prisma.service";
import { MailService } from "./services/mail.service";
import { TokenService } from "./services/token.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,

      // signOptions: { expiresIn: "600s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, MailService, TokenService],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
