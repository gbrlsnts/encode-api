import { IsNotEmpty, IsUrl } from 'class-validator';
import { jobUrlValidation, validDestinationProtocols } from 'src/config';
import { JobResourceDto } from './job-resource.dto';

// Workaround since we cant provide source or destination context to decorator
export class JobDestinationDto extends JobResourceDto {
  @IsUrl(jobUrlValidation(validDestinationProtocols), {
    message: `$property must be an URL address with a valid protocol (${validDestinationProtocols.join(
      ', ',
    )})`,
  })
  @IsNotEmpty()
  url: string;
}
