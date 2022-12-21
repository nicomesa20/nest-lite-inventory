import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { hash, compare, genSalt } from 'bcrypt';
import { RegisterDto } from "src/dto/register.dto";
import { UserService } from "src/users/services/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) { }

  public async register(register: RegisterDto): Promise<void> {
    const salt = await genSalt();
    const hashedPassword = await hash(register.password, salt);
    try {
      await this.userService.create({
        ...register,
        password: hashedPassword
      });
    } catch (error) {
      if (error.errno === 19) {
        throw new HttpException(
          'User with this credentials already exists.',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Something went wrong.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(email);
      if (user) {
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
          throw new HttpException('Bad credentials', HttpStatus.BAD_REQUEST);
        }
      }
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public async login(user: any) {
    const payload = { email: user.username, sub: user.id, role: user.role, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}