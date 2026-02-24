// scheme.dto.ts
import { IsArray, IsNumber, IsObject, ValidateNested, IsOptional, Min, Max } from "class-validator";
import { Type } from "class-transformer";

// DTO для viewport
export class ViewportDto {
  @IsNumber()
  @Min(-10000)
  @Max(10000)
  x: number;

  @IsNumber()
  @Min(-10000)
  @Max(10000)
  y: number;

  @IsNumber()
  @Min(0.1) // zoom не может быть меньше 0.1
  @Max(10) // и не больше 10
  zoom: number;
}

// DTO для внутренней структуры scheme
export class SchemeDataDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object) // или создайте отдельный DTO для нод
  nodes: unknown[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Object) // или создайте отдельный DTO для ребер
  edges: unknown[];

  @IsObject()
  @ValidateNested()
  @Type(() => ViewportDto)
  viewport: ViewportDto;
}

// Главный DTO
export class SchemeDto {
  @IsObject()
  @ValidateNested()
  @Type(() => SchemeDataDto)
  scheme: SchemeDataDto;
}
