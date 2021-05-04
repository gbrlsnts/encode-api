import { Queue } from 'bull';
import { ModuleRef } from '@nestjs/core';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bull';
import { JobDto } from './dto';

@Injectable()
export class JobService implements OnModuleInit {
  private videoQueue: Queue;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.videoQueue = this.moduleRef.get(getQueueToken(), {
      strict: false,
    });
  }

  async createJob(job: JobDto): Promise<string> {
    // save job in db
    // push to queue
    // return job id
    const queuedJob = await this.videoQueue.add(job);

    return queuedJob.id.toString();
  }
}
