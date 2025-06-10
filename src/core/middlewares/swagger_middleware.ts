import swagger from "@elysiajs/swagger";

export const swaggerMiddleware = () => {
    const PORT = Bun.env.PORT;
    const HOST = Bun.env.HOST || "localhost";

    return swagger({
        path: "/api/docs",
        documentation: {
            info: {
                title: "Sendi Studio - Message Relay API",
                version: "1.0.0",
                description: "API documentation for Sendi Studio - Message Relay",
            },
            servers: [{ url: Bun.env.MODE === "development" ? `http://${HOST}:${PORT}` : `https://${HOST}` }],
        },
    });
};
