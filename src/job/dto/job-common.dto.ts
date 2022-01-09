import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobResourceDto } from './job-resource.dto';

export class JobCommonDto {
  @Type(() => JobResourceDto)
  @ValidateNested()
  @IsNotEmpty()
  source: JobResourceDto;

  @Type(() => JobResourceDto)
  @ValidateNested()
  @IsNotEmpty()
  destination: JobResourceDto;
}
