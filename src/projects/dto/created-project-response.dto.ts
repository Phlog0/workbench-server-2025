import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProjectType } from "@prisma/client";
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsIn,
  IsObject,
  ValidateNested,
} from "class-validator";
import { SchemeDataDto } from "./scheme.dto";
import { Type } from "class-transformer";

export class CreatedProjectResponse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  id: string;
  //
  @IsString()
  @IsIn(["ТП", "РП", "КТП"])
  @ApiProperty({ enum: ProjectType, example: ProjectType.КТП })
  projectType: ProjectType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  title: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ type: Date, example: new Date(), nullable: true })
  updatedAt: Date | null;
  @ApiProperty({ type: SchemeDataDto, example: { type: SchemeDataDto } })
  @IsObject()
  @ValidateNested()
  @Type(() => SchemeDataDto)
  projectScheme: SchemeDataDto;
}
