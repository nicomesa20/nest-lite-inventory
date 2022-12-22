"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("../../users/services/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(register) {
        const salt = await (0, bcrypt_1.genSalt)();
        const hashedPassword = await (0, bcrypt_1.hash)(register.password, salt);
        try {
            await this.userService.create(Object.assign(Object.assign({}, register), { password: hashedPassword }));
        }
        catch (error) {
            if (error.errno === 19) {
                throw new common_1.HttpException('User with this credentials already exists.', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Something went wrong.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateUser(email, password) {
        try {
            const user = await this.userService.findByEmail(email);
            if (user) {
                const passwordMatch = await (0, bcrypt_1.compare)(password, user.password);
                if (!passwordMatch) {
                    throw new common_1.HttpException('Bad credentials', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async login(user) {
        const payload = { email: user.username, sub: user.id, role: user.role, name: user.name };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map