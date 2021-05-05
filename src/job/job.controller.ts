import { Controller, Get, Param, Post } from '@nestjs/common';
import { Job } from './model';
import { JobDto } from './dto/job.dto';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  getJobs(): Promise<Job[]> {
    return this.jobService.getJobs();
  }

  @Get('/:id')
  getJobsById(@Param('id') id: number): Promise<Job> {
    return this.jobService.getJobById(id);
  }

  @Post()
  createJob(job: JobDto): Promise<Job> {
    return this.jobService.createJob(job);
  }
}
