import { Injectable } from "@nestjs/common";
import { CreateItemPropertyDto } from "./dto/create-item-property.dto";
import { UpdateItemPropertyDto } from "./dto/update-item-property.dto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ItemPropertiesService {
  constructor(private prisma: PrismaService) {}
  create(createItemPropertyDto: CreateItemPropertyDto) {
    return "This action adds a new itemProperty";
  }

  findAll() {
    return `This action returns all itemProperties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemProperty`;
  }

  update(id: number, updateItemPropertyDto: UpdateItemPropertyDto) {
    return `This action updates a #${id} itemProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemProperty`;
  }
}
