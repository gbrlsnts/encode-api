import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { EventPattern, Ctx, RedisContext } from '@nestjs/microservices';
import {
  JobStatusChangedEvent,
  JobEventStatusMap,
  JobStatusFailedEvent,
} from './types/events.type';
import { JobService } from './job.service';
import { JobStatusService } from './job-status.service';
import { Job, JobStatusAvailable } from './model';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class JobStatusController {
  constructor(
    private jobStatusService: JobStatusService,
    private jobService: JobService,
  ) {}

  @EventPattern('job.status.*.start')
  async saveJobStatus(
    event: JobStatusChangedEvent,
    @Ctx() context: RedisContext,
  ): Promise<Job> {
    const eventStatus = context.getChannel().split('.')[2];

    const status = await this.jobStatusService.getStatusByCode(
      JobEventStatusMap[eventStatus],
    );

    return this.jobService.setJobStatus(event.jobId, status.id);
  }

  @EventPattern('job.status.fail')
  async saveJobFailed(event: JobStatusFailedEvent): Promise<Job> {
    const status = await this.jobStatusService.getStatusByCode(
      JobStatusAvailable.FAIL,
    );

    return this.jobService.setJobStatus(event.jobId, status.id);
  }
}
