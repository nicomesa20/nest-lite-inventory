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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const dist_1 = require("@nestjs-modules/mailer/dist");
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const guards_1 = require("../../auth/guards");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const role_enum_1 = require("../../auth/models/role.enum");
const create_article_dto_1 = require("../../dto/create-article.dto");
const article_service_1 = require("../services/article.service");
let ArticleController = class ArticleController {
    constructor(articleService, mailService) {
        this.articleService = articleService;
        this.mailService = mailService;
    }
    async createArticle(createArticle) {
        return this.articleService.create(createArticle);
    }
    async listArticles(companyId) {
        return this.articleService.findByCompany(companyId);
    }
    async exportArticles(res, companyId, email) {
        const buffer = await this.articleService.exportArticlesPdf(companyId);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=test.pdf',
            'Content-Length': buffer.length,
        });
        res.end(buffer);
        await this.mailService.sendMail({
            to: email,
            from: 'nicomesa2013@gmail.com',
            text: 'Testing Mail Service',
            subject: 'Inventory',
            attachments: [{
                    filename: 'Inventory.pdf',
                    contentType: 'application/pdf',
                    content: buffer,
                }]
        });
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('create-article'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "createArticle", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.External),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('list-articles/:companyId'),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "listArticles", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.External),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('export-articles/:companyId/:email'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('companyId')),
    __param(2, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "exportArticles", null);
ArticleController = __decorate([
    (0, common_1.Controller)('article'),
    __metadata("design:paramtypes", [article_service_1.ArticleService,
        dist_1.MailerService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map