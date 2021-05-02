import { Controller, Post } from '@nestjs/common';
import { TranscodeService } from './transcode.service';
import { JobDto } from './dto/job.dto';

@Controller('transcode')
export class TranscodeController {
  constructor(private transcodeService: TranscodeService) {}

  @Post()
  createJob(job: JobDto): Promise<string> {
    return this.transcodeService.createJob(job);
  }
}
