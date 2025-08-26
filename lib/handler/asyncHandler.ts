import { ApiError } from "./ApiError";
import { errorResponse } from "./ApiResponse";

type AsyncHandlerFn<TArgs extends unknown[] = []> = (
  req: Request,
  ...args: TArgs
) => Promise<Response>;

export const asyncHandler =
  <TArgs extends unknown[]>(fn: AsyncHandlerFn<TArgs>): AsyncHandlerFn<TArgs> =>
  async (req, ...args) => {
    try {
      return await fn(req, ...args);
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        return errorResponse(err.statusCode, err.message, err.data);
      }
      return errorResponse(
        500,
        "Internal Server Error",
        err instanceof Error ? err.message : String(err)
      );
    }
  };
