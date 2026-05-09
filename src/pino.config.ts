import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModuleAsyncParams } from "nestjs-pino";

export const pinoConfig: LoggerModuleAsyncParams = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
        pinoHttp: {
            // Уровень по умолчанию
            level: process.env.LOG_LEVEL || "info",

            // Автоматическое определение уровня по статусу
            customLogLevel: function (req, res, err) {
                if (res.statusCode >= 500 || err) {
                    return "error";
                }
                if (res.statusCode >= 400) {
                    return "warn";
                }
                return "info";
            },

            // Форматирование сообщений
            customSuccessMessage: function (req, res) {
                return `${req.method} ${req.url} -> ${res.statusCode}`;
            },

            customErrorMessage: function (req, res, err) {
                return `ERROR ${req.method} ${req.url} -> ${res.statusCode}: ${err.message}`;
            },

            // Serializers - не переопределяем, а расширяем
            serializers: {
                req: (req) => ({
                    method: req.method,
                    url: req.url,
                    id: req.id,
                    headers: {
                        "user-agent": req.headers["user-agent"],
                        "content-type": req.headers["content-type"],
                    },
                }),
                res: (res) => ({
                    statusCode: res.statusCode,
                }),
                err: (err) => ({
                    type: err.name,
                    message: err.message,
                    stack: err.stack,
                    code: err.code,
                }),
            },

            // ВАЖНО: Не используйте transport при отправке через Alloy!
            // Убедитесь, что transport закомментирован или удален

            // Дополнительно: добавляем контекст
            autoLogging: {
                ignore: (req) => req.url === "/health", // не логируем healthcheck
            },

            // Форматирование timestamp
            timestamp: () => `,"time":${Date.now()}`,
        },
    }),
    inject: [ConfigService],
};
