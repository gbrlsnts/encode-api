import { Module } from '@nestjs/common';
import { TranscodeModule } from './transcode/transcode.module';

@Module({
  imports: [TranscodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
