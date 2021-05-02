import { Module } from '@nestjs/common';
import { TranscodeService } from './transcode.service';
import { TranscodeController } from './transcode.controller';

@Module({
  providers: [TranscodeService],
  controllers: [TranscodeController],
})
export class TranscodeModule {}
