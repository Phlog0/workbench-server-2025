import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { PrismaService } from "../prisma.service";
import { AiService } from "@/ai/ai.service";
import { Project } from "@/generated/prisma/client";

interface ProjectWithParsedPosition extends Omit<Project, "position"> {
    position: { lat: number; lng: number };
}
@Injectable()
export class ProjectsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly aiService: AiService,
    ) {}

    async createProject(createProjectDto: CreateProjectDto) {
        try {
            if (createProjectDto.prompt) {
                const scheme = await this.aiService.create(createProjectDto.prompt);
                const newProject = await this.prismaService.project.create({
                    data: {
                        description: createProjectDto.description,
                        title: createProjectDto.title,
                        projectScheme: scheme,
                        projectType: createProjectDto.projectType,
                        createdAt: createProjectDto.createdAt,
                        updatedAt: createProjectDto.updatedAt,
                        position: JSON.stringify(createProjectDto.position),
                        markerColor: createProjectDto.markerColor,
                    },
                });
                return { newProject: newProject };
            } else {
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
                return { newProject: newProject };
            }
        } catch (error) {
            console.error("Prisma error:", error);
            throw new Error("Ошибка при создании проекта");
        }
    }

    async findAllProjects() {
        const projects = await this.prismaService.project.findMany({
            orderBy: { updatedAt: "desc" },
        });
        return projects.map((project) => ({
            ...project,
            position: project.position ? JSON.parse(project.position as string) : null,
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

    async updateProject(id: string, updateProjectDto: any) {
        const findProject = await this.prismaService.project.findUnique({ where: { id } });
        if (!findProject) {
            throw new NotFoundException("Проект не найден");
        }

        const updatedProject = await this.prismaService.project.update({
            where: {
                id,
            },

            data: updateProjectDto,
        });
        if (!updatedProject) {
            throw new NotFoundException("Проект не найден");
        }

        return { message: `Данные проекта ${id} успешно обновлены` };
    }

    async updateProjectScheme(id: string, updateProjectDto: any) {
        const findProject = await this.prismaService.project.findUnique({ where: { id } });
        if (!findProject) {
            throw new NotFoundException("Проект не найден");
        }
        await this.prismaService.project.update({
            where: {
                id,
            },
            data: { projectScheme: updateProjectDto },
        });

        return { message: `Данные проекта ${id} успешно обновлены` };
    }

    async removeProject(id: string) {
        const findProject = await this.prismaService.project.findUnique({ where: { id } });
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
