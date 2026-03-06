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
import { SkipAuth } from "@/auth/decorators/skip-auth.decorator";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreatedProjectResponse } from "./dto/created-project-response.dto";
@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiCreatedResponse({ type: CreatedProjectResponse })
  @Post("create")
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.createProject(createProjectDto);
  }
  @ApiCreatedResponse({ type: CreatedProjectResponse })
  @Get("all-projects")
  async findAllProjects() {
    return await this.projectsService.findAllProjects();
  }
  @Get("project-info/:id")
  async findProjectInfo(@Param("id") id: string) {
    return await this.projectsService.findProjectInfo(id);
  }
  @Get("project-scheme/:id")
  async findProjectScheme(@Param("id") id: string) {
    const projectScheme = await this.projectsService.findProjectScheme(id);

    return projectScheme;
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateProjectDto: CreateProjectDto) {
    return await this.projectsService.updateProject(id, updateProjectDto);
  }
  @Patch("/project-scheme/:id")
  async updateProjectScheme(
    @Param("id") id: string,
    // !! ZOD-парсер!
    // {nodes:[], edges:[], viewport:{}}
    @Body() updateProjectDto: any,
  ) {
    return await this.projectsService.updateProjectScheme(id, updateProjectDto);
  }

  @Delete(":id")
  async removeProject(@Param("id") id: string) {
    return await this.projectsService.removeProject(id);
  }
}
