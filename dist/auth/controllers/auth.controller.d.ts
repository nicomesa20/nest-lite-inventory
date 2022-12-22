import { RegisterDto } from "src/dto/register.dto";
import { AuthService } from "../services/auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        accessToken: string;
    }>;
    registerAdmin(registerAdmin: RegisterDto): Promise<void>;
    registerExternal(registerExternal: RegisterDto): Promise<void>;
}
