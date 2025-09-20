import { Context } from "elysia";
import { WebResponse } from "../data/responses/web_response";
import { HealthRepo } from "../repos/health_repo";
import { ErrorResponse } from "../data/responses/error_response";

export class HealthService {
    static async healthCheckService(context: Context): Promise<WebResponse<string> | ErrorResponse> {
        const dbOk = await HealthRepo.checkDbConnection();

        if (!dbOk) {
            context.set.status = 500;
            return {
                success: false, error: {
                    code: "DB_ERROR",
                    message: "Database connection failed"
                }
            };
        } else {
            return { success: true, data: "Database connection successful" };
        }
    }
}
