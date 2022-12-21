import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "src/companies/models/company.entity";
import { ArticleController } from "./controllers/article.controller";
import { Article } from "./models/article.entity";
import { ArticleService } from "./services/article.service";

@Module({
    imports: [TypeOrmModule.forFeature([Article, Company])],
    providers: [ArticleService],
    exports: [ArticleService],
    controllers: [ArticleController]
})
export class ArticleModule {}