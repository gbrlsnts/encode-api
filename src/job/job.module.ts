import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobRepository, JobStatusRepository } from './model/';
import { JobQueueService } from './job-queue.service';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobStatusService } from './job-status.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobRepository, JobStatusRepository]),
    BullModule.registerQueueAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        name: configService.get<string>('QUEUE_VIDEO'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JobQueueService, JobService, JobStatusService],
  controllers: [JobController],
})
export class JobModule {}
