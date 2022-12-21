import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './articles/article.module';
import { ArticleController } from './articles/controllers/article.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/controllers/auth.controller';
import { CompanyModule } from './companies/company.module';
import { CompanyController } from './companies/controllers/company.controller';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CompanyModule,
    ArticleModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "LiteThinkingDB",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.us-east-1.amazonaws.com',
        auth: {
          user: 'AKIA6AUKNJW5C2LMSKHQ',
          pass: 'BI+pZVbipccysIf8/1hZBovEnkckG5Oz5egukDXOP8VF'
        }
      }
    })
  ],
  controllers: [AppController, AuthController, CompanyController, ArticleController],
  providers: [AppService],
})
export class AppModule {}
