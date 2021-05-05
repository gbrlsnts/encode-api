import { JobDestinationTypeDto } from './job-destination-type.dto';
import { JobDestinationDto } from './job-destination.dto';
import { JobOutput } from './job-output.dto';

export class JobDto {
  source: string;
  destination: JobDestinationTypeDto & JobDestinationDto;
  output: JobOutput[];
}
