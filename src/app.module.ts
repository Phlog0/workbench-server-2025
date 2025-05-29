import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectsModule } from "./projects/projects.module";
import { ItemPropertiesModule } from "./item-properties/item-properties.module";
import { GetDictionaryDataModule } from "./get-dictionary-data/get-dictionary-data.module";

@Module({
  imports: [ProjectsModule, ItemPropertiesModule, GetDictionaryDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
