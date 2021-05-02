import { JobDestinationTypeDto } from './job-destination-type.dto';
import { JobDestinationDto } from './job-destination.dto';

export class JobDto {
  source: string;
  destination: JobDestinationTypeDto & JobDestinationDto;
}
