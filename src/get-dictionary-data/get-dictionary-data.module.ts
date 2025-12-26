import { Module } from "@nestjs/common";
import { GetDictionaryDataService } from "./get-dictionary-data.service";
import { GetDictionaryDataController } from "./get-dictionary-data.controller";

@Module({
  controllers: [GetDictionaryDataController],
  providers: [GetDictionaryDataService],
})
export class GetDictionaryDataModule {}
