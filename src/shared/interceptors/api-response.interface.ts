export type IApiResponse<T = null> = {
  statusCode: number;
  message: string;
  timestamp: string;
  data?: T;
};

export type PartialApiResponse<T> = Partial<IApiResponse<T>>;
