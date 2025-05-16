import jwt from "@elysiajs/jwt";
import type { Elysia } from "elysia";
import { WebResponse } from "../../data/responses/web_response";

export const jwtSetup = jwt({ name: "jwt", secret: Bun.env.JWT_SECRET! });

export const jwtAuthMiddleware = (app: Elysia) =>
    app.use(jwtSetup).onBeforeHandle(async ({ jwt, headers, set }) => {
        const token = headers.authorization?.replace("Bearer ", "");

        if (!token) {
            set.status = 401;
            const response: WebResponse<null> = {
                status: "ERROR",
                message: "Missing Authorization header",
            };
            return response;
        }

        const payload = await jwt.verify(token);

        if (!payload) {
            set.status = 401;
            const response: WebResponse<null> = {
                status: "ERROR",
                message: "Invalid or expired token",
            };
            return response;
        }

        const isExpired = payload.expires && Number(payload.expires) < Math.floor(Date.now() / 1000);

        if (isExpired) {
            set.status = 401;
            const response: WebResponse<null> = {
                status: "ERROR",
                message: "Token is expired",
            };
            return response;
        }

        // Valid token, do nothing
        return;
    });
