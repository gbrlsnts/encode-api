import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { JobOutputDto } from './job-output.dto';
import { JobCommonDto } from './job-common.dto';

export class JobMultiOutputDto extends JobCommonDto {
  @Type(() => JobOutputDto)
  @ValidateNested({
    each: true,
  })
  @ArrayNotEmpty()
  output: JobOutputDto[];
}
