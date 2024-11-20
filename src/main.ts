import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

const port = process.env.PORT || 3000;
console.log(
  `Launching NestJS app on port ${port}, URL: http://0.0.0.0:${port}`,
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: 'http://localhost:5173', credentials: true });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('coffee shop demo')
    .setDescription('coffee shop website and app API documentation')
    .setVersion('1.0')
    .addTag('coffee shop')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(port);
}
bootstrap();
