import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { PrismaService } from "../prisma.service";
@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const newProject = await this.prisma.project.create({
      data: {
        ...createProjectDto,
      },
    });
    return { message: "Проект успешно создан", newProject: newProject };
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
    });
    if (project === null) throw new HttpException("Проект не найден", HttpStatus.NOT_FOUND);
    //    return {
    //   message: "Такого проекта не существует"
    // }

    return { project };
  }
  async findProjectScheme(id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        projectScheme: true,
      },
    });
    if (project === null) throw new HttpException("Проект не найден", HttpStatus.NOT_FOUND);

    return project;
  }

  // findOne(id: string) {
  //   return `This action returns a #${id} project`;
  // }

  async updateProject(id: string, updateProjectDto: CreateProjectDto) {
    try {
      const updatedProject = await this.prisma.project.update({
        where: {
          id,
        },
        data: updateProjectDto,
      });
      return { message: `Данные проекта ${id} успешно обновлены` };
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
    }
  }

  async updateProjectScheme(id: string, updateProjectDto: any) {
    try {
      const updatedProject = await this.prisma.project.update({
        where: {
          id,
        },
        data: { projectScheme: updateProjectDto },
      });
      return { message: `Данные проекта ${id} успешно обновлены` };
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
    }
  }

  async removeProject(id: string) {
    try {
      const deletedProject = await this.prisma.project.delete({
        where: {
          id,
        },
      });
      return { message: `Данные проекта ${id} успешно удалены` };
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
    }
  }
}
