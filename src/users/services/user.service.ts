import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/models/user.entity";
import { RegisterDto } from "src/dto/register.dto";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public findById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id
      }
    });
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'No existe un usuario con este email',
      HttpStatus.NOT_FOUND,
    );
  }

  public async create(user: RegisterDto): Promise<void> {
    const newUser = this.userRepository.create(user);

    await this.userRepository.save(newUser);
  }
}