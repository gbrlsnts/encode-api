import { Controller, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDto } from './dto/job.dto';

@Controller('job')
export class JobController {
  constructor(private transcodeService: JobService) {}

  @Post()
  createJob(job: JobDto): Promise<string> {
    return this.transcodeService.createJob(job);
  }
}
