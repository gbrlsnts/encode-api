import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { jobUrlValidation, destinationProtocols } from '../../config/';

export class JobDestinationDto {
  @IsUrl(jobUrlValidation(destinationProtocols))
  url: string;

  @IsNotEmpty()
  @IsOptional()
  key: string;

  @IsNotEmpty()
  @IsOptional()
  secret: string;
}
