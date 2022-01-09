import { IsUrl } from 'class-validator';
import { jobUrlValidation, validProtocols } from '../../config/';

export class JobUrlDto {
  @IsUrl(jobUrlValidation(validProtocols))
  url: string;
}
