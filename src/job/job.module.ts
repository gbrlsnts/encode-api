import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobService } from './job.service';
import { JobController } from './job.controller';

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
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
