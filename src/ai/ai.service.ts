import { HttpException, HttpStatus, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { isAxiosError } from "axios";

@Injectable()
export class AiService {
    constructor(private readonly httpService: HttpService) {}
    async create(prompt: string) {
        try {
            const url = process.env.AI_SERVER_URL;

            const response = await lastValueFrom(
                this.httpService.post(`${url}/generate`, {
                    text: prompt,
                    max_nodes: 13,
                }),
            );

            return response.data;
        } catch (error) {
            if (isAxiosError(error) && !error.response) {
                throw new ServiceUnavailableException(
                    "AI-сервер временно недоступен. Попробуйте позже.",
                    {
                        description: `Не удалось подключиться к AI-серверу (код: ${error.code})`,
                    },
                );
            }

            if (isAxiosError(error) && error.response) {
                const statusCode = error.response.status;
                const errorMessage = error.response.data?.message || "Неизвестная ошибка";
                if (statusCode >= 500) {
                    throw new ServiceUnavailableException(
                        `AI-сервер вернул ошибку: ${errorMessage}`,
                        {
                            description: `Внутренняя ошибка сервера (код: ${statusCode})`,
                        },
                    );
                }
                throw new HttpException(
                    `случилась ошибка на стороне ИИ-сервера: ${errorMessage}`,
                    HttpStatus.BAD_REQUEST,
                );
            }
            console.log(error);
            throw new HttpException(
                "Критическая ошибка при обработке запроса",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
