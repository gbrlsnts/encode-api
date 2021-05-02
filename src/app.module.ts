import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TranscodeModule } from './transcode/transcode.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    TranscodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
