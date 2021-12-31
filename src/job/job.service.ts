import { Connection } from 'typeorm';
import {
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
}
