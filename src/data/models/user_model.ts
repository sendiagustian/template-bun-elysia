export interface UserModel {
    uid: string;
    status: "active" | "inActive" | "disable";
    photo: string | null;
    full_name: string;
    username: string;
    email: string;
    email_verification: boolean;
    phone: string;
    phone_verification: boolean;
    password: string;
    created_at: string;
    updated_at: string;
}
