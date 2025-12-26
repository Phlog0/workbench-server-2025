import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  HttpCode,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { SkipAuth } from "src/auth/decorators/skip-auth.decorator";
import puppeteer from "puppeteer";

@SkipAuth()
@Controller("api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }

  @Get("/all-projects")
  @HttpCode(HttpStatus.OK)
  async findAllProjects() {
    return await this.projectsService.findAllProjects();
  }
  @Get(":id")
  async findProjectInfo(@Param("id") id: string) {
    try {
      return await this.projectsService.findProjectInfo(id);
    } catch (error) {
      throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN);
    }
  }
  @Get("project-scheme/:id")
  async findProjectScheme(@Param("id") id: string) {
    try {
      const projectScheme = await this.projectsService.findProjectScheme(id);

      return {
        message: "Проект найден",
        ...projectScheme,
      };
    } catch (error) {
      throw new HttpException("FORBIDDEN", HttpStatus.FORBIDDEN);
    }
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateProjectDto: CreateProjectDto) {
    return await this.projectsService.updateProject(id, updateProjectDto);
  }
  @Patch("/project-scheme/:id")
  async updateProjectScheme(
    @Param("id") id: string,
    // !! Что с этим сделать? Какой-то мега-парсер...?
    @Body() updateProjectDto: any,
  ) {
    return await this.projectsService.updateProjectScheme(id, updateProjectDto);
  }

  @Delete(":id")
  async removeProject(@Param("id") id: string) {
    return await this.projectsService.removeProject(id);
  }
}
