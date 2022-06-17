import * as hash from 'object-hash';
import { Equal } from 'typeorm';
import { Cache } from 'cache-manager';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { JobStatus, JobStatusRepository } from './model';

@Injectable()
export class JobStatusService {
  private CACHE_TTL = 86400; // 1 day

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

  /**
   * Get a status by id
   * @param id
   * @returns
   */
  async getStatusById(id: number): Promise<JobStatus> {
    return this.getStatusByAttr({ id });
  }

  /**
   * Get a status by code
   * @param code
   * @returns
   */
  async getStatusByCode(code: string): Promise<JobStatus> {
    return this.getStatusByAttr({ code });
  }

  /**
   * Search a job status by the given attributes
   * @param options search options
   * @returns job status
   */
  async getStatusByAttr(options: Partial<JobStatus>): Promise<JobStatus> {
    const key = `status_${hash(options, {
      algorithm: 'md5',
    })})`;

    const cache = await this.cacheManager.get<JobStatus>(key);

    if (cache) return cache;

    if (options.code) options.code = options.code.toUpperCase();

    const status = await this.jobStatusRepository.findOne(options);

    if (!status) throw new NotFoundException();

    await this.cacheManager.set(key, status, {
      ttl: this.CACHE_TTL,
    });

    return status;
  }
}
