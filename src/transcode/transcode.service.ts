import { Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { JobDto } from './dto';

@Injectable()
export class TranscodeService {
  constructor(@InjectQueue('transcode.video') private videoQueue: Queue) {}

  async createJob(job: JobDto): Promise<string> {
    // save job in db
    // push to queue
    // return job id
    const queuedJob = await this.videoQueue.add(job);

    return queuedJob.id.toString();
  }
}
