"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const article_module_1 = require("./articles/article.module");
const article_controller_1 = require("./articles/controllers/article.controller");
const auth_module_1 = require("./auth/auth.module");
const auth_controller_1 = require("./auth/controllers/auth.controller");
const company_module_1 = require("./companies/company.module");
const company_controller_1 = require("./companies/controllers/company.controller");
const user_module_1 = require("./users/user.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UsersModule,
            company_module_1.CompanyModule,
            article_module_1.ArticleModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "sqlite",
                database: "LiteThinkingDB",
                entities: [__dirname + "/**/*.entity{.ts,.js}"],
                synchronize: true
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'email-smtp.us-east-1.amazonaws.com',
                    auth: {
                        user: 'AKIATHCEAUINBXZPN3A3',
                        pass: 'BNLJTveu/X+KWe1e4XWe5zQ+4ryHbUDi8iliOheJiNfK'
                    }
                }
            })
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController, company_controller_1.CompanyController, article_controller_1.ArticleController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map