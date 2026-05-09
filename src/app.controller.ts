import { Controller, Get, Res } from "@nestjs/common";
import { register } from "prom-client";
import { SkipAuth } from "./auth/decorators/skip-auth.decorator";
import { Response } from "express";

@Controller()
export class AppController {
    @SkipAuth()
    @Get("/metrics")
    async getMetrics(@Res() response: Response) {
        const metrics = await register.metrics();
        response.type(register.contentType);
        response.send(metrics);
    }
}
