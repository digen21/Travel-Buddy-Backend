import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PinoLoggerModule } from './pino-logger/pino-logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    PrismaModule,
    PinoLoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
