import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { IApiResponse } from "./api-response.interface";
import { map, Observable } from "rxjs";

export class ApiResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    const now = new Date();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data: IApiResponse<T>) => {
        if (data.data) {
          return {
            timestamp: now.toISOString(),
            statusCode: response.statusCode,
            message: data?.message || "Success",
            data: data?.data || null,
          };
        }
        return {
          timestamp: now.toISOString(),
          statusCode: response.statusCode,
          message: data?.message || "Success",
          //   data: data?.data || null,
        };
      }),
    );
  }
}
