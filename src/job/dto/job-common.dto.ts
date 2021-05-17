import { IsNotEmpty, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobDestinationDto } from './job-destination.dto';
import { jobUrlValidation, sourceProtocols } from '../../config';

export class JobCommonDto {
  @IsUrl(jobUrlValidation(sourceProtocols))
  source: string;

  @Type(() => JobDestinationDto)
  @ValidateNested()
  @IsNotEmpty()
  destination: JobDestinationDto;
}
