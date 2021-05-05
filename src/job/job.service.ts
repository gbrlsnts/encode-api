import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, JobRepository } from './model/';
import { JobQueueService } from './job-queue.service';
import { JobDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobStatusService } from './job-status.service';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
    private jobStatusService: JobStatusService,
    private jobQueueService: JobQueueService,
  ) {}

  /**
   * Get all jobs
   * @returns Job[]
   */
  getJobs(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  /**
   * Get a job by id
   * @param jobId job id
   * @returns Job
   */
  async getJobById(jobId: number): Promise<Job> {
    const job = await this.jobRepository.findOne(jobId);

    if (!job) throw new NotFoundException();

    return job;
  }

  /**
   * Create and queue a job
   * @param job job data
   * @returns Job
   */
  async createJob(job: JobDto): Promise<Job> {
    const status = await this.jobStatusService.getFirstStatus();

    const dbJob = this.jobRepository.create({
      status,
    });

    const savedJob = await this.jobRepository.save(dbJob);

    await this.jobQueueService.queueJob({
      jobId: savedJob.id,
      query: job,
    });

    return savedJob;
  }
}
