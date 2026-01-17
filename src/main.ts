import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  // `bufferLogs: true` hold logs messages in a memory until pino-logger is connected/injected/initialized
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
    // logger: false,
  });

  app.useLogger(app.get(Logger));

  // Enable graceful shutdown on SIGTERM/SIGINT (cleanup DB, queues, etc.)
  app.enableShutdownHooks();

  app.use(compression()); // gzip enabled

  const logger = app.get(Logger);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 3000;

  await app.listen(port, () => {
    logger.log(`Server running on port: ${port}`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
