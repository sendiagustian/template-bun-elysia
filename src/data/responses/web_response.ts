export type WebResponse<T> = {
    status: number | "SUCCESS" | "FAILED" | "ERROR";
    data?: T;
    message?: string;
};
