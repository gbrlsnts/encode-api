import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TranscodeService } from './transcode.service';
import { TranscodeController } from './transcode.controller';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: configService.get<string>('QUEUE_VIDEO'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TranscodeService],
  controllers: [TranscodeController],
})
export class TranscodeModule {}
