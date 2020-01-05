import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}
  getHello(): string {
    this.logger.log('In AppService');
    return 'Hello World!22';
  }
}
