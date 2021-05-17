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
  async queueJob(job: JobQueueItem): Promise<string[]> {
    const outputs = Array.isArray(job.query.output)
      ? job.query.output
      : [job.query.output];

    const jobs: JobQueueItem[] = outputs.map((output) => ({
      jobId: job.jobId,
      query: {
        source: job.query.source,
        destination: job.query.destination,
        output,
      },
    }));

    const results = await Promise.all(jobs.map((j) => this.videoQueue.add(j)));

    return results.map((r) => r.id.toString());
  }
}
