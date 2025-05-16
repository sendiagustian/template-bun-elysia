import { ElysiaErrorSchema } from "../../core/schema/elysia_context";

export type ErrorResponse = {
    status: number | "ERROR";
    details?: string | ElysiaErrorSchema;
};
