export interface ApiResponse<T = unknown> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
}

export const successResponse = <T>(
  statusCode: number,
  message: string,
  data?: T
): Response => {
  const body: ApiResponse<T> = {
    statusCode,
    success: true,
    message,
    data: data ?? null,
  };

  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
};

export const errorResponse = (
  statusCode: number,
  message: string,
  data?: unknown
): Response => {
  const body: ApiResponse = {
    statusCode,
    success: false,
    message,
    data: data ?? null,
  };

  return new Response(JSON.stringify(body), {
    status: statusCode,
    headers: { "Content-Type": "application/json" },
  });
};
