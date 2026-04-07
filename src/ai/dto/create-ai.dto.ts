import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString } from "class-validator";

export class CreateAiDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, example: "Сделай проект с 4 ячейками по 35 кВ" })
    prompt: string;
}
