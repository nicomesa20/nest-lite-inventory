import { Role } from "src/auth/models/role.enum";
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}
