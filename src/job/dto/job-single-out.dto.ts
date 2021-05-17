import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { JobOutputDto } from './job-output.dto';
import { JobCommonDto } from './job-common.dto';

export class JobSingleOutputDto extends JobCommonDto {
  @Type(() => JobOutputDto)
  @ValidateNested()
  @IsNotEmpty()
  output: JobOutputDto;
}
