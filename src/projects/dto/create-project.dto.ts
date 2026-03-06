import { ProjectType } from "@prisma/client";
import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: "ТП-10 кВ",
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: "Трансформаторная подстанция, находящаяся в где-то ХМАО",
  })
  description: string;

  @IsIn(["ТП", "РП", "КТП"])
  @ApiProperty({ enum: ProjectType, example: ProjectType.КТП })
  projectType: ProjectType;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({ type: Date, example: new Date() })
  createdAt?: Date;
  @IsOptional()
  @IsDate()
  @ApiPropertyOptional({ type: Date, example: new Date() })
  updatedAt?: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, example: "Создай проект с 4 ячейками по 35 кВ" })
  prompt?: string;
  // @IsOptional()
  // @ValidateNested() // <-- ВАЖНО: указываем, что объект вложенный
  // @Type(() => SchemeDto) // <-- ВАЖНО: указываем тип для преобразования
  // projectScheme: SchemeDto;
}
