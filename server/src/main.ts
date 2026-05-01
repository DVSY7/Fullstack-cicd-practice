import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://43.201.107.65:5173', // React 주소 허용
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
