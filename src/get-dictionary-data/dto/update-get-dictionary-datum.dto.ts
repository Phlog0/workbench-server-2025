import { PartialType } from "@nestjs/mapped-types";
import { CreateGetDictionaryDatumDto } from "./create-get-dictionary-datum.dto";

export class UpdateGetDictionaryDatumDto extends PartialType(CreateGetDictionaryDatumDto) {}
