import { JobDto } from '../dto/';

export interface JobQueueItem {
  jobId: number;
  query: JobDto;
}
