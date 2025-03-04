import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.enableCors({ origin: '*' });
  await app.init();

  if (process.env.ENV === 'local') {
    const port = 3000;
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
  }
}

bootstrap();
export default server;
