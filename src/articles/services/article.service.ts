import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain, plainToClass } from "class-transformer";
import { CreateArticleDto } from "src/dto/create-article.dto";
import { Repository } from "typeorm";
import { Article } from "../models/article.entity";
import { Company } from "src/companies/models/company.entity";
const PDFDocument = require('pdfkit-table');

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @InjectRepository(Company) private companyRepository: Repository<Company>
    ) { }

    public async create(articleDto: CreateArticleDto): Promise<void> {
        const data = instanceToPlain(articleDto);
        const art = plainToClass(Article, data);
        const newArticle = await this.articleRepository.create(art);

        await this.articleRepository.save(newArticle);
    }

    public async findByCompany(companyId: string): Promise<Article[]> {
        return await this.articleRepository.find({ where: { companyId } });
    }

    public async exportArticlesPdf(companyId: string): Promise<Buffer>
    {
      const company = await this.companyRepository.findOne({ where: { id: companyId }});
      const articles = await this.articleRepository.find({ where: {
        companyId
      }});
      const pdfBuffer: Buffer = await new Promise( resolve => {
        const doc =  new PDFDocument(
          {
            size: "LETTER",
            bufferPages: true
          })

          doc.text(`${company.name}'s` + ' Inventory');
          doc.moveDown();
          articles.forEach(article => {
            doc.text(`- Name: ${article.name}` + ' ' + `Quantity:${article.quantity}`);
          });

          const buffer = []
          doc.on('data', buffer.push.bind(buffer))
          doc.on('end', () => {
              const data = Buffer.concat(buffer)
              resolve(data)
          })
          doc.end()
      });

      return pdfBuffer;
    
  }
}