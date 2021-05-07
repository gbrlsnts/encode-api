import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JobDestinationDto } from './job-destination.dto';
import { JobOutputDto } from './job-output.dto';
import { jobUrlValidation, sourceProtocols } from '../../config';

export class JobDto {
  @IsUrl(jobUrlValidation(sourceProtocols))
  source: string;

  @Type(() => JobDestinationDto)
  @ValidateNested()
  @IsNotEmpty()
  destination: JobDestinationDto;

  @Type(() => JobOutputDto)
  @ValidateNested({
    each: true,
  })
  @ArrayNotEmpty()
  output: JobOutputDto[];
}
