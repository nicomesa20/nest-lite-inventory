import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/user.module";
import { jwtConstants } from "./constants";
import { AuthController } from "./controllers/auth.controller";
import { JwtAuthGuard } from "./guards";
import { RolesGuard } from "./guards/roles.guard";
import { AuthService } from "./services/auth.service";
import { JwtStrategy, LocalStrategy } from "./strategies";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
