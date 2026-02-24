import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/prisma.service";
import { UserDto } from "../dto/user.dto";
import { Injectable } from "@nestjs/common";
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async generateTokens(payload: UserDto) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "10s",
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "30s",
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: number, token: string) {
    const tokenData = await this.prismaService.refreshToken.findFirst({ where: { userId } });
    if (tokenData) {
      const updatedToken = await this.prismaService.refreshToken.update({
        data: { token },
        where: { userId },
      });

      return updatedToken;
    }
    const createdToken = await this.prismaService.refreshToken.create({
      data: { token, userId },
    });
    return createdToken;
  }
  async removeToken(token: string) {
    const deletedToken = await this.prismaService.refreshToken.delete({ where: { token } });

    return deletedToken;
  }

  async validateAccessToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      return userData;
    } catch {
      return null;
    }
  }
  async validateRefreshToken(token: string) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return userData;
    } catch {
      return null;
    }
  }
  async findToken(token: string) {
    try {
      const findToken = await this.prismaService.refreshToken.findFirst({ where: { token } });
      return findToken;
    } catch {
      return null;
    }
  }
}
