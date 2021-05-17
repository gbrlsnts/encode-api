import { JobSingleOutputDto } from '../dto/job-single-out.dto';
import { JobMultiOutputDto } from '../dto/job-multi-out.dto';

export interface JobQueueItem {
  jobId: number;
  query: JobSingleOutputDto | JobMultiOutputDto;
}
