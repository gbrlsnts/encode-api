import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Job } from './model';
import { JobDto } from './dto/job.dto';
import { JobService } from './job.service';

@Controller('job')
@UseInterceptors(ClassSerializerInterceptor)
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  getJobs(): Promise<Job[]> {
    return this.jobService.getJobs(['status']);
  }

  @Get('/:id')
  getJobsById(@Param('id') id: number): Promise<Job> {
    return this.jobService.getJobById(id, ['status']);
  }

  @Post()
  createJob(job: JobDto): Promise<Job> {
    return this.jobService.createJob(job);
  }
}
