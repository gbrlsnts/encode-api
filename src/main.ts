import { ValidationPipe } from '@nestjs/common';
import { RedisOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const appPort = configService.get<number>('APP_PORT');

  const redisHost = configService.get<string>('REDIS_HOST');
  const redisPort = configService.get<number>('REDIS_PORT', 6379);

  app.connectMicroservice<RedisOptions>(
    {
      transport: Transport.REDIS,
      options: {
        url: `redis://${redisHost}:${redisPort}`,
      },
    },
    {
      inheritAppConfig: true,
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      skipNullProperties: false,
      whitelist: true,
      transform: true,
    }),
  );

  await app.startAllMicroservicesAsync();
  await app.listen(appPort);
}
bootstrap();
