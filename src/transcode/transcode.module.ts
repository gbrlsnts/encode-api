import { Module } from '@nestjs/common';
import { TranscodeService } from './transcode.service';

@Module({
  providers: [TranscodeService],
})
export class TranscodeModule {}
