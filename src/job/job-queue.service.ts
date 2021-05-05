import { Queue } from 'bull';
import { ModuleRef } from '@nestjs/core';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { getQueueToken } from '@nestjs/bull';
import { JobQueueItem } from './types';

@Injectable()
export class JobQueueService implements OnModuleInit {
  private videoQueue: Queue;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.videoQueue = this.moduleRef.get(getQueueToken(), {
      strict: false,
    });
  }

  /**
   * Queue a job
   * @param job job data
   * @returns id in queue
   */
  async queueJob(job: JobQueueItem): Promise<string> {
    const queuedJob = await this.videoQueue.add(job);

    return queuedJob.id.toString();
  }
}
