import { JobStatusAvailable } from '../model';

/**
 * Event representing a status change from a worker
 */
export interface JobStatusChangedEvent {
  /**
   * Job uuid
   */
  jobId: string;
}

export interface JobStatusFailedEvent extends JobStatusChangedEvent {
  /**
   * Message describing the error
   */
  errorMessage: string;
}

/**
 * Maps status codes from worker to api
 */
export const JobEventStatusMap: Record<string, string> = {
  download: JobStatusAvailable.DOWNLOAD,
  encode: JobStatusAvailable.ENCODE,
  store: JobStatusAvailable.SAVE,
};
