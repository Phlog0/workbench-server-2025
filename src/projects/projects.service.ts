import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
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
    return newProject;
  }

  async findAllProjects() {
    const projects = await this.prisma.project.findMany();
    return projects;
  }

  async findProject(id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });
    if (project === null) throw new HttpException("Проект не найден", HttpStatus.NOT_FOUND);
    //    return {
    //   message: "Такого проекта не существует"
    // }
    const sections10kV = await this.prisma.section10kV.findMany({
      where: {
        projectId: id,
      },
    });
    const sections10kVIds = sections10kV.map((s) => s.id);
    const fixations = await this.prisma.fixation10kV.findMany({
      where: {
        projectId: id,
        section10kVId: { in: sections10kVIds },
      },
    });

    const fixationsIds = fixations.map((f) => f.id);
    const cells10kV = await this.prisma.cell10kV.findMany({
      where: {
        projectId: id,
        fixation10kVId: { in: fixationsIds },
      },
    });
    return { project, sections10kV, fixations, cells10kV };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} project`;
  // }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }

  async removeProject(id: string) {
    const deletedProject = await this.prisma.project.delete({
      where: {
        id,
      },
    });
    return deletedProject;
  }
}
