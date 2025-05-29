import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ItemPropertiesService } from "./item-properties.service";
import { CreateItemPropertyDto } from "./dto/create-item-property.dto";
import { UpdateItemPropertyDto } from "./dto/update-item-property.dto";

@Controller("api/itemProperties")
export class ItemPropertiesController {
  constructor(private readonly itemPropertiesService: ItemPropertiesService) {}

  @Post()
  create(@Body() createItemPropertyDto: CreateItemPropertyDto) {
    return this.itemPropertiesService.create(createItemPropertyDto);
  }

  @Get()
  findAll() {
    return this.itemPropertiesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.itemPropertiesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateItemPropertyDto: UpdateItemPropertyDto) {
    return this.itemPropertiesService.update(+id, updateItemPropertyDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.itemPropertiesService.remove(+id);
  }
}
