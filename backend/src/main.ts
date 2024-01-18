import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3001);
}
bootstrap()
  .then(() => console.log('Backend started in port 3001'))
  .catch((err) => console.log(err));
