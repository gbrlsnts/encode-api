import { EntityRepository, Repository } from 'typeorm';
import { JobStatus } from './job-status.entity';

@EntityRepository(JobStatus)
export class JobStatusRepository extends Repository<JobStatus> {}
