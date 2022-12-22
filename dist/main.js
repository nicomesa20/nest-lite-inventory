"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const swaggerOptions = new swagger_1.DocumentBuilder()
        .setTitle('LiteThinking Back')
        .setDescription('API for LiteThinking App')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(process.env.PORT || 3100);
}
bootstrap();
//# sourceMappingURL=main.js.map