import { IsNotEmpty, IsUrl } from 'class-validator';
import { jobUrlValidation, validSourceProtocols } from 'src/config';
import { JobResourceDto } from './job-resource.dto';

// Workaround since we cant provide source or destination context to decorator
export class JobSourceDto extends JobResourceDto {
  @IsUrl(jobUrlValidation(validSourceProtocols), {
    message: `$property must be an URL address with a valid protocol (${validSourceProtocols.join(
      ', ',
    )})`,
  })
  @IsNotEmpty()
  url: string;
}
