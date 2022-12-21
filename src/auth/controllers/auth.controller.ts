import { Body, Controller, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto } from "src/dto/register.dto";
import { Role } from "../models/role.enum";
import { AuthService } from "../services/auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register-admin')
  public async registerAdmin(@Body(new ValidationPipe()) registerAdmin: RegisterDto) {
    return this.authService.register({
      ...registerAdmin,
      role: Role.Admin
    })
  }

  @Post('register-external')
  public async registerExternal(@Body(new ValidationPipe()) registerExternal: RegisterDto) {
    return this.authService.register({
      ...registerExternal,
      role: Role.External
    })
  }
}