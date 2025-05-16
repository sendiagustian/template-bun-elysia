import { Context } from "elysia";
import { WebResponse } from "../data/responses/web_response";
import { HealthRepo } from "../repos/health_repo";

export class HealthService {
    static async healthCheckService(context: Context): Promise<WebResponse<string>> {
        const dbOk = await HealthRepo.checkDbConnection();

        if (!dbOk) {
            context.set.status = 500;
            return { status: "FAILED", message: "Database connection failed" };
        } else {
            return { status: "SUCCESS", message: "Database connection successful" };
        }
    }
}
