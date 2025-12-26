import { ProjectType } from "@prisma/client";
import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}
