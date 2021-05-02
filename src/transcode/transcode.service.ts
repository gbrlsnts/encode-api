import { Injectable } from '@nestjs/common';
import { JobDto } from './dto';

@Injectable()
export class TranscodeService {
  async createJob(job: JobDto): Promise<string> {
    // save job in db
    // push to queue
    // return job id
    return 'dummy';
  }
}
