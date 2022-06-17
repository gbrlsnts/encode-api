import { Connection } from 'typeorm';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Job, JobRepository } from './model/';
import { JobQueueService } from './job-queue.service';
import { JobMultiOutputDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobStatusService } from './job-status.service';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);

  constructor(
    private connection: Connection,
    @InjectRepository(JobRepository)
    private jobRepository: JobRepository,
    private jobStatusService: JobStatusService,
    private jobQueueService: JobQueueService,
  ) {}

  /**
   * Get all jobs
   * @param relations which relations to load
   * @returns Job[]
   */
  getJobs(relations: string[] = []): Promise<Job[]> {
    return this.jobRepository.find({
      relations,
    });
  }

  /**
   * Get a job by id
   * @param jobId job id
   * @param relations which relations to load
   * @returns Job
   */
  async getJobById(jobId: string, relations: string[] = []): Promise<Job> {
    const job = await this.jobRepository.findOne(jobId, {
      relations,
    });

    if (!job) throw new NotFoundException();

    return job;
  }

  /**
   * Create and queue a job
   * @param job job data
   * @returns Job
   */
  async createJob(job: JobMultiOutputDto): Promise<Job> {
    const status = await this.jobStatusService.getFirstStatus();

    const dbJob = this.jobRepository.create({
      status,
      query: job,
    });

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const savedJob = await queryRunner.manager.save(dbJob);

      await this.jobQueueService.queueJob({
        jobId: savedJob.id,
        query: job,
      });

      await queryRunner.commitTransaction();

      return savedJob;
    } catch (error) {
      this.logger.error(error, error?.trace);
      await queryRunner.rollbackTransaction();

      throw new ServiceUnavailableException();
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Set a new status Id for a job
   * @param jobId Job to set the new status
   * @param statusId Status to set
   * @returns The updated job
   */
  async setJobStatus(jobId: string, statusId: number): Promise<Job> {
    const job = await this.jobRepository.findOne(jobId, {
      relations: ['status'],
    });

    const status = await this.jobStatusService.getStatusById(statusId);

    if (job.status.order > status.order)
      throw new ConflictException(
        'Status can not be updated to previous value',
      );

    job.statusId = statusId;

    return this.jobRepository.save(job);
  }
}
