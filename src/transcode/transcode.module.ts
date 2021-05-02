import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TranscodeService } from './transcode.service';
import { TranscodeController } from './transcode.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'transcode.video',
    }),
  ],
  providers: [TranscodeService],
  controllers: [TranscodeController],
})
export class TranscodeModule {}
