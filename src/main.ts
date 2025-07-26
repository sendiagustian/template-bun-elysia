import cors from "@elysiajs/cors";
import { Elysia } from "elysia";
import { swaggerMiddleware } from "./core/middlewares/swagger_middleware";
import { loggerAfterMiddleware, loggerBeforeMiddleware } from "./core/middlewares/logger_middleware";
import { errorMiddleware } from "./core/middlewares/error_middleware";
import { logger } from "./core/utils/logging";
import { healthRouter } from "./routers/health_route";

const app = new Elysia()
    .use(cors())
    .use(swaggerMiddleware())
    .onBeforeHandle((context) => loggerBeforeMiddleware(context))
    .onAfterResponse((context) => loggerAfterMiddleware(context))
    .onError((context) => {
        logger.error(`Error occurred: ${context.error}`);
        errorMiddleware(context.code, context.set);
    })
    .group("/api/v1", (app) => {
        app.group("health-check", (group) => group.use(healthRouter));

        // SAMPLE AUTHENTICATION
        // app.group("auth", (group) => group.use(authRouter));
        // SAMPLE USER WITH JWT AUTHENTICATION
        // app.group("user", (group) => group.use(jwtAuthMiddleware).use(userRouter));

        return app;
    });

const PORT = parseInt(process.env.PORT || "8001", 10);

app.listen(PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${PORT}/api/docs`);
});
