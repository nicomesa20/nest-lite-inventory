/// <reference types="node" />
import { CreateArticleDto } from "src/dto/create-article.dto";
import { Repository } from "typeorm";
import { Article } from "../models/article.entity";
import { Company } from "src/companies/models/company.entity";
export declare class ArticleService {
    private articleRepository;
    private companyRepository;
    constructor(articleRepository: Repository<Article>, companyRepository: Repository<Company>);
    create(articleDto: CreateArticleDto): Promise<void>;
    findByCompany(companyId: string): Promise<Article[]>;
    exportArticlesPdf(companyId: string): Promise<Buffer>;
}
