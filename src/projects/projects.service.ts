import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { PrismaService } from "../prisma.service";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { SchemeDataDto } from "./dto/scheme.dto";
import { MapPositionDto } from "./dto/map-position.dto";

@Injectable()
export class ProjectsService {
    constructor(private readonly prismaService: PrismaService) {}

    async createProject(createProjectDto: CreateProjectDto) {
        const newProject = await this.prismaService.project.create({
            data: {
                description: createProjectDto.description,
                title: createProjectDto.title,
                projectType: createProjectDto.projectType,
                createdAt: createProjectDto.createdAt,
                updatedAt: createProjectDto.updatedAt,
                position: JSON.stringify(createProjectDto.position),
                markerColor: createProjectDto.markerColor,
            },
        });
        return { newProject };
    }

    async findAllProjects() {
        const projects = await this.prismaService.project.findMany({
            orderBy: { updatedAt: "desc" },
        });
        return projects.map((project) => ({
            ...project,
            position: JSON.parse(project.position as string) as MapPositionDto,
        }));
    }

    async findProjectInfo(id: string) {
        const project = await this.prismaService.project.findUnique({
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

        return project;
    }
    async findProjectScheme(id: string) {
        const projectScheme = await this.prismaService.project.findUnique({
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

    async updateProject(id: string, dto: UpdateProjectDto) {
        const findProject = await this.prismaService.project.findUnique({
            where: { id },
        });
        if (!findProject) {
            throw new NotFoundException("Проект не найден");
        }

        const updatedProject = await this.prismaService.project.update({
            where: {
                id,
            },

            data: {
                markerColor: dto.markerColor,
                position: JSON.stringify(dto.position),
                projectType: dto.projectType,
                title: dto.title,
                description: dto.description,
            },
        });
        if (!updatedProject) {
            throw new NotFoundException("Проект не найден");
        }

        return { message: `Данные проекта ${id} успешно обновлены` };
    }

    async updateProjectScheme(id: string, dto: SchemeDataDto) {
        const findProject = await this.prismaService.project.findUnique({
            where: { id },
        });
        if (!findProject) {
            throw new NotFoundException("Проект не найден");
        }
        await this.prismaService.project.update({
            where: {
                id,
            },
            data: { projectScheme: JSON.stringify(dto) },
        });

        return { message: `Данные проекта ${id} успешно обновлены` };
    }

    async removeProject(id: string) {
        const findProject = await this.prismaService.project.findUnique({
            where: { id },
        });
        if (!findProject) {
            throw new NotFoundException("Проект не найден");
        }
        await this.prismaService.project.delete({
            where: {
                id,
            },
        });

        return { message: `Данные проекта ${id} успешно удалены` };
    }
}
