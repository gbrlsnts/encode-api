import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Job } from './model';
import { JobMultiOutputDto } from './dto/job-multi-out.dto';
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
  getJobsById(@Param('id') id: string): Promise<Job> {
    return this.jobService.getJobById(id, ['status']);
  }

  @Post()
  createJob(@Body() job: JobMultiOutputDto): Promise<Job> {
    return this.jobService.createJob(job);
  }
}
