import { Module } from "@nestjs/common";
import { ItemPropertiesService } from "./item-properties.service";
import { ItemPropertiesController } from "./item-properties.controller";
import { PrismaService } from "../../prisma/prisma.service";
@Module({
  controllers: [ItemPropertiesController],
  providers: [ItemPropertiesService, PrismaService],
})
export class ItemPropertiesModule {}
