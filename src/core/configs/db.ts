import { SQL, SQLOptions } from "bun";
import { decode } from "../utils/decrypt";

let db: SQL | null = null;

export function getDatabase(): SQL {
    if (db) return db;

    const host = decode(process.env.DB_HOST!);
    const port = decode(process.env.DB_PORT!);
    const user = decode(process.env.DB_USER!);
    const pass = decode(process.env.DB_PASS!);
    const name = process.env.DB_NAME!;

    if (!host || !port || !user || !pass || !name) {
        throw new Error("Missing database environment variables");
    }

    const sqlOptions: SQLOptions = {
        hostname: host,
        port: parseInt(port),
        username: user,
        password: pass,
        database: name,
        tls: false,

        // Connection pool settings
        max: 20, // Maximum connections in pool
        idleTimeout: 30, // Close idle connections after 30s
        maxLifetime: 0, // Connection lifetime in seconds (0 = forever)
        connectionTimeout: 30, // Timeout when establishing new connections

        // onconnect: (_client) => {
        //     logger.info("✅ Connected to PostgreSQL");
        // },
        // onclose: (_client) => {
        //     logger.info("🔌 Connection closed");
        // },
    };

    db = new SQL(sqlOptions);

    return db;
}
