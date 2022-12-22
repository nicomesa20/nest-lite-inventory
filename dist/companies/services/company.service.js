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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("../models/company.entity");
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async create(company) {
        const data = (0, class_transformer_1.instanceToPlain)(company);
        const comp = (0, class_transformer_1.plainToClass)(company_entity_1.Company, data);
        const newCompany = await this.companyRepository.create(comp);
        return await this.companyRepository.save(newCompany);
    }
    async findAll() {
        return this.companyRepository.find();
    }
    async update(editCompany) {
        const id = editCompany.companyId;
        const companyToUpdate = await this.companyRepository.findOne({ where: { id } });
        const companyUpdated = Object.assign(companyToUpdate, editCompany);
        await this.companyRepository.save(companyUpdated);
    }
    async delete(id) {
        const company = await this.companyRepository.findOne({ where: { id } });
        await this.companyRepository.remove(company);
    }
};
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map