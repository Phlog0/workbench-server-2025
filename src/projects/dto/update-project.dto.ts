import { ProjectType } from "@/generated/prisma/enums";
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectDto {
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

    @IsString()
    @ApiProperty({
        type: String,
        example: "blue",
    })
    markerColor: string;
}
