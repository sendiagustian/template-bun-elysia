export interface AuthCreateReq {
    user_uid: string;
    token: string;
    status: "login" | "logout";
    expired_at: number | null;
}
