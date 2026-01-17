import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // _config: ConfigService
      useFactory: () => ({
        pinoHttp: {
          //   level:
          //     config.get<string>('NODE_ENV') !== 'production' ? 'debug' : 'info',
          base: undefined,
          customSuccessMessage: (req, res) =>
            `${req.method} ${req.url} ${res.statusCode}`,
          customErrorMessage: (_req: Request, _res: Response, err) =>
            `Request errored: ${err.message}`,
          serializers: {
            req(req: Request) {
              return {
                method: req.method,
                url: req.url,
              };
            },
            res(res: Response) {
              return {
                statusCode: res.statusCode,
              };
            },
          },
          transport: {
            targets: [
              {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:h:MM:ss tt',
                  ignore: 'pid,hostname',
                  singleLine: true,
                },
              },
            ],
          },
        },
      }),
    }),
  ],
})
export class PinoLoggerModule {}
