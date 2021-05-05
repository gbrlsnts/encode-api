import { Equal } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JobStatus, JobStatusRepository } from './model';

@Injectable()
export class JobStatusService {
  constructor(
    @InjectRepository(JobStatusRepository)
    private jobStatusRepository: JobStatusRepository,
    private configService: ConfigService,
  ) {}

  /**
   * Get the first status
   * @returns JobStatus
   */
  getFirstStatus(): Promise<JobStatus> {
    const queuedStatusCode = this.configService.get('FIRST_STATUS');

    return this.jobStatusRepository.findOne({
      where: {
        code: Equal(queuedStatusCode),
      },
    });
  }
}
