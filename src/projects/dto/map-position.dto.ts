import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsIn, IsNumber } from "class-validator";

export class MapPositionDto {
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: 51.505,
    })
    lat: number;
    @IsNumber()
    @ApiProperty({
        type: Number,
        example: -0.09,
    })
    lng: number;
}
