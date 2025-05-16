import swagger from "@elysiajs/swagger";

export const swaggerMiddleware = () => {
    return swagger({
        path: "/api/docs",
        documentation: {
            info: {
                title: "Bio Link API",
                version: "1.0.0",
                description: "Auto-generated Swagger documentation using Elysia",
            },
            servers: [{ url: "http://localhost:8001" }],
        },
    });
};
