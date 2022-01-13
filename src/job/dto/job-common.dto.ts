import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobSourceDto } from './job-source.dto';
import { JobDestinationDto } from './job-destination.dto';

export class JobCommonDto {
  @Type(() => JobSourceDto)
  @ValidateNested()
  @IsNotEmpty()
  source: JobSourceDto;

  @Type(() => JobDestinationDto)
  @ValidateNested()
  @IsNotEmpty()
  destination: JobDestinationDto;
}
