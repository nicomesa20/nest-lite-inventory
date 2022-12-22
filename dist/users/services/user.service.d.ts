import { User } from "src/auth/models/user.entity";
import { RegisterDto } from "src/dto/register.dto";
import { Repository } from "typeorm";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(user: RegisterDto): Promise<void>;
}
