import { IsNotEmpty, IsString } from "class-validator";

export class CreateAiDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}
