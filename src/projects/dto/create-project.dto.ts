import { ProjectType } from "@prisma/client";
import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { SchemeDto } from "./scheme.dto";
import { Type } from "class-transformer";

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(["ТП", "РП", "КТП"])
  projectType: ProjectType;

  @IsOptional()
  @IsDate()
  createdAt?: Date;
  @IsOptional()
  @IsDate()
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  prompt?: string;
  // @IsOptional()
  // @ValidateNested() // <-- ВАЖНО: указываем, что объект вложенный
  // @Type(() => SchemeDto) // <-- ВАЖНО: указываем тип для преобразования
  // projectScheme: SchemeDto;
}
