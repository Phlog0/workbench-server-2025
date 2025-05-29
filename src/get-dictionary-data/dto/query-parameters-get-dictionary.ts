import { Type } from "class-transformer";
import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class QueryParametersGetDictionary {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(4)
  measuringCurrentTransformersDeviceAccuracyClass?: number;
}
