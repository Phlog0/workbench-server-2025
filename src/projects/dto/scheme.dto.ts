// scheme.dto.ts
import { IsArray, IsNumber, IsObject, ValidateNested, IsOptional, Min, Max } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { RFNodeTypesValues } from "@/shared/rf-nodes-types";

export class NodeDto {
  @ApiProperty({ type: String, example: "node-1" })
  id: string;

  @ApiProperty({ type: String, example: "Название узла" })
  @ApiProperty({ example: "default" })
  type?: RFNodeTypesValues;

  @ApiProperty({ example: { x: 100, y: 100 } })
  position: { x: number; y: number };
}

export class EdgeDto {
  @ApiProperty({ type: String, example: "edge-1" })
  id: string;

  @ApiProperty({ type: String, example: "node-1" })
  source: string;

  @ApiProperty({ type: String, example: "node-2" })
  target: string;
}

export class ViewportDto {
  @IsNumber()
  @Min(-10000)
  @Max(10000)
  @ApiProperty({ type: Number, example: 0 })
  x: number;

  @IsNumber()
  @Min(-10000)
  @Max(10000)
  @ApiProperty({ type: Number, example: 0 })
  y: number;

  @IsNumber()
  @Min(0.1)
  @Max(10)
  @ApiProperty({ type: Number, example: 1 })
  zoom: number;
}

// DTO для внутренней структуры scheme
export class SchemeDataDto {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => NodeDto) // или создайте отдельный DTO для нод
  @ApiProperty({
    type: [NodeDto], // Указываем массив NodeDto
    description: "Массив узлов схемы",
    example: [
      {
        id: "node-1",
        type: "Cell35Kv",
        position: { x: 100, y: 100 },
      },
    ],
  })
  nodes: NodeDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EdgeDto) // или создайте отдельный DTO для ребер
  @ApiProperty({
    example: {
      id: "edge-1",
      source: "node-1",
      target: "node-2",
    },
  })
  edges: EdgeDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => ViewportDto)
  @ApiProperty({
    example: {
      x: 0,
      y: 0,
      zoom: 0.5,
    },
  })
  viewport: ViewportDto;
}
