export interface AuthLoginRequest {
    email: string;
    password: string;
    set_expires?: boolean;
}
