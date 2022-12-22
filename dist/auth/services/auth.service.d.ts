import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "src/dto/register.dto";
import { UserService } from "src/users/services/user.service";
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(register: RegisterDto): Promise<void>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
    }>;
}
