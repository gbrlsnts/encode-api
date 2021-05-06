import { JobDestinationTypeDto } from './job-destination-type.dto';
import { JobDestinationDto } from './job-destination.dto';
import { JobOutputDto } from './job-output.dto';

export class JobDto {
  source: string;
  destination: JobDestinationTypeDto & JobDestinationDto;
  output: JobOutputDto[];
}
