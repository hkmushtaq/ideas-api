import { Module, Logger, Scope } from '@nestjs/common';
import {
  LoggerModule,
  Logger as LoggerFromPino,
  PinoLogger,
} from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      prettyPrint: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: Logger,
      useFactory: (pinoLogger: PinoLogger) => {
        return new LoggerFromPino(pinoLogger);
      },
      inject: [PinoLogger],
      scope: Scope.TRANSIENT,
    },
  ],
})
export class AppModule {}
