import { MailerService } from "@nestjs-modules/mailer/dist";
import { CreateArticleDto } from "src/dto/create-article.dto";
import { ArticleService } from "../services/article.service";
export declare class ArticleController {
    private articleService;
    private mailService;
    constructor(articleService: ArticleService, mailService: MailerService);
    createArticle(createArticle: CreateArticleDto): Promise<void>;
    listArticles(companyId: string): Promise<import("../models/article.entity").Article[]>;
    exportArticles(res: any, companyId: string, email: string): Promise<void>;
}
