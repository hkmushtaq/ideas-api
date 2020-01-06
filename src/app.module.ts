import { Module, Logger, Scope } from '@nestjs/common';
import {
  LoggerModule,
  Logger as LoggerFromPino,
  PinoLogger,
} from 'nestjs-pino';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './app-health.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      prettyPrint: process.env.NODE_ENV !== 'production',
      autoLogging: true,
      useLevelLabels: true,
    }),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
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
