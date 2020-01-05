import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const setUpSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Ideas Api')
    .setDescription('The Api reference for the ideas application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useLogger(app.get(Logger));

  setUpSwagger(app);

  await app.listen(3000);
}

bootstrap();
