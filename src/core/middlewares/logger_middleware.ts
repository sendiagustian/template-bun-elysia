import { Context } from "elysia";
import { logger } from "../utils/logging";

export interface CustomStore {
    startTime: number;
}

export const loggerBeforeMiddleware = (context: Context) => {
    const customStore = context.store as { startTime: number };
    customStore.startTime = performance.now();
};

export const loggerAfterMiddleware = (context: Context) => {
    const endpoint = context.path;
    const method = context.request.method;
    const status = context.set.status;

    const customStore = context.store as { startTime: number };
    const startTime = customStore.startTime;
    const duration = performance.now() - startTime;

    const logMessage = `[${method}] ${endpoint} => Code: ${status} - Time: ${duration.toFixed(2)}ms`;

    if (typeof status === "number" && status >= 200 && status < 300) {
        logger.info(logMessage);
    } else {
        logger.error(logMessage);
    }
};
