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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const guards_1 = require("../../auth/guards");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const role_enum_1 = require("../../auth/models/role.enum");
const dto_1 = require("../../dto");
const company_service_1 = require("../services/company.service");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createCompany(createCompany) {
        return this.companyService.create(createCompany);
    }
    async editCompany(editCompany) {
        return this.companyService.update(editCompany);
    }
    async listCompanies() {
        return this.companyService.findAll();
    }
    async deleteCompany(companyId) {
        return this.companyService.delete(companyId);
    }
};
__decorate([
    (0, common_1.Post)('create-company'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)('edit-company'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EditCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "editCompany", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.External),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('list-companies'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "listCompanies", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)('remove-company/:companyId'),
    __param(0, (0, common_1.Param)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteCompany", null);
CompanyController = __decorate([
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map