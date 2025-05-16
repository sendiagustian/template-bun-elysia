import { ElysiaErrorCodeSchema, ElysiaSetSchema } from "../schema/elysia_context";
import { ErrorResponse } from "../../data/responses/error_response";

export const errorMiddleware = (code: ElysiaErrorCodeSchema, set: ElysiaSetSchema): ErrorResponse => {
    let statusCode = 500;
    let details = "Terjadi kesalahan pada server";

    switch (code) {
        case "VALIDATION":
            statusCode = 400;
            details = "Validasi gagal";
            break;
        case "NOT_FOUND":
            statusCode = 404;
            details = "Path Endpoint tidak ditemukan";
            break;
        case "PARSE":
            statusCode = 400;
            details = "Permintaan tidak dapat diuraikan";
            break;
        case "INVALID_COOKIE_SIGNATURE":
            statusCode = 401;
            details = "Tanda tangan cookie tidak valid";
            break;
        case "INVALID_FILE_TYPE":
            statusCode = 415;
            details = "Tipe file tidak didukung";
            break;
        case "INTERNAL_SERVER_ERROR":
            statusCode = 500;
            details = "Kesalahan server internal";
            break;
        case "UNKNOWN":
        default:
            statusCode = typeof code === "number" ? code : 500;
            details = "Terjadi kesalahan yang tidak diketahui";
            break;
    }

    // Set HTTP status code
    set.status = statusCode;

    return {
        status: "ERROR",
        details: details,
    };
};
