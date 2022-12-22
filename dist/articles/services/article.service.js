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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("../models/article.entity");
const company_entity_1 = require("../../companies/models/company.entity");
const PDFDocument = require('pdfkit-table');
let ArticleService = class ArticleService {
    constructor(articleRepository, companyRepository) {
        this.articleRepository = articleRepository;
        this.companyRepository = companyRepository;
    }
    async create(articleDto) {
        const data = (0, class_transformer_1.instanceToPlain)(articleDto);
        const art = (0, class_transformer_1.plainToClass)(article_entity_1.Article, data);
        const newArticle = await this.articleRepository.create(art);
        await this.articleRepository.save(newArticle);
    }
    async findByCompany(companyId) {
        return await this.articleRepository.find({ where: { companyId } });
    }
    async exportArticlesPdf(companyId) {
        const company = await this.companyRepository.findOne({ where: { id: companyId } });
        const articles = await this.articleRepository.find({ where: {
                companyId
            } });
        const pdfBuffer = await new Promise(resolve => {
            const doc = new PDFDocument({
                size: "LETTER",
                bufferPages: true
            });
            doc.text(`${company.name}'s` + ' Inventory');
            doc.moveDown();
            articles.forEach(article => {
                doc.text(`- Name: ${article.name}` + ' ' + `Quantity:${article.quantity}`);
            });
            const buffer = [];
            doc.on('data', buffer.push.bind(buffer));
            doc.on('end', () => {
                const data = Buffer.concat(buffer);
                resolve(data);
            });
            doc.end();
        });
        return pdfBuffer;
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(1, (0, typeorm_1.InjectRepository)(company_entity_1.Company)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map