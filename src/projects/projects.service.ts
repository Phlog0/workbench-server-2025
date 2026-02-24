import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { PrismaService } from "../prisma.service";
import { AiService } from "@/ai/ai.service";
@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      if (createProjectDto.prompt) {
        const scheme = await this.aiService.create(createProjectDto.prompt);
        const newProject = await this.prisma.project.create({
          data: {
            description: createProjectDto.description,
            title: createProjectDto.title,
            projectScheme: scheme,
            projectType: createProjectDto.projectType,
            createdAt: createProjectDto.createdAt,
            updatedAt: createProjectDto.updatedAt,
          },
        });
        return { newProject: newProject };
      } else {
        const newProject = await this.prisma.project.create({
          data: {
            description: createProjectDto.description,
            title: createProjectDto.title,
            projectType: createProjectDto.projectType,
            createdAt: createProjectDto.createdAt,
            updatedAt: createProjectDto.updatedAt,
          },
        });
        return { newProject: newProject };
      }
    } catch (error) {
      console.error("Prisma error:", error);
      throw new Error("Ошибка при создании проекта");
    }
  }

  async findAllProjects() {
    const projects = await this.prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    return projects;
  }

  async findProjectInfo(id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },

      omit: {
        projectScheme: true,
      },
    });
    if (!project) {
      throw new NotFoundException("Проект не найден");
    }
    //    return {
    //   message: "Такого проекта не существует"
    // }

    return project;
  }
  async findProjectScheme(id: string) {
    const projectScheme = await this.prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        projectScheme: true,
      },
    });
    if (!projectScheme) {
      throw new NotFoundException("Проект не найден");
    }

    return projectScheme;
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} project`;
  // }s

  async updateProject(id: string, updateProjectDto: any) {
    const findProject = await this.prisma.project.findUnique({ where: { id } });
    if (!findProject) {
      throw new NotFoundException("Проект не найден");
    }
    // const plainData = plainToInstance(Object, updateProjectDto, {
    //   enableImplicitConversion: true,
    // });
    const updatedProject = await this.prisma.project.update({
      where: {
        id,
      },
      // data: plainData,
      data: updateProjectDto,
    });
    if (!updatedProject) {
      throw new NotFoundException("Проект не найден");
    }

    return { message: `Данные проекта ${id} успешно обновлены` };
  }

  async updateProjectScheme(id: string, updateProjectDto: any) {
    const findProject = await this.prisma.project.findUnique({ where: { id } });
    if (!findProject) {
      throw new NotFoundException("Проект не найден");
    }
    await this.prisma.project.update({
      where: {
        id,
      },
      data: { projectScheme: updateProjectDto },
    });

    return { message: `Данные проекта ${id} успешно обновлены` };
  }

  async removeProject(id: string) {
    const findProject = await this.prisma.project.findUnique({ where: { id } });
    if (!findProject) {
      throw new NotFoundException("Проект не найден");
    }
    await this.prisma.project.delete({
      where: {
        id,
      },
    });

    return { message: `Данные проекта ${id} успешно удалены` };
  }
}
