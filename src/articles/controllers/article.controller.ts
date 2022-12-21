import { MailerService } from "@nestjs-modules/mailer/dist";
import { Body, Controller, Get, Param, Post, Res, UseGuards, ValidationPipe } from "@nestjs/common"
import { Roles } from "src/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/auth/guards";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Role } from "src/auth/models/role.enum";
import { CreateArticleDto } from "src/dto/create-article.dto";
import { ArticleService } from "../services/article.service";

@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService,
                private mailService: MailerService) { }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('create-article')
    public async createArticle(@Body(new ValidationPipe()) createArticle: CreateArticleDto) {
        return this.articleService.create(createArticle);
    }

    @Roles(Role.Admin, Role.External)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('list-articles/:companyId')
    public async listArticles(@Param('companyId') companyId: string) {
        return this.articleService.findByCompany(companyId);
    }

    @Roles(Role.Admin, Role.External)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('export-articles/:companyId/:email')
    public async exportArticles(@Res() res, @Param('companyId') companyId: string, @Param('email') email: string) {
        const buffer = await this.articleService.exportArticlesPdf(companyId);

        res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=test.pdf',
        'Content-Length': buffer.length,
        });

        res.end(buffer);

        await this.mailService.sendMail({
            to: email,
            from: 'jhaiderbeta@hotmail.com',
            text: 'Testing Mail Service',
            subject: 'Inventory',
            attachments: [{
                filename: 'Inventory.pdf',
                contentType: 'application/pdf',
                content: buffer,
            }]
        }); 
    }
}