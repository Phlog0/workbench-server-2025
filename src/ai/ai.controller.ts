import { Controller, Post, Body } from "@nestjs/common";
import { AiService } from "./ai.service";
import { CreateAiDto } from "./dto/create-ai.dto";
import { SkipAuth } from "@/auth/decorators/skip-auth.decorator";
@SkipAuth()
@Controller("ai")
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  create(@Body() createAiDto: CreateAiDto) {
    return this.aiService.create(createAiDto.prompt);
  }
}
