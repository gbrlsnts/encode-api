import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { jobUrlValidation, destinationProtocols } from '../../config/';

export class JobDestinationDto {
  @IsUrl(jobUrlValidation(destinationProtocols))
  url: string;

  @IsNotEmpty()
  @Optional()
  key: string;

  @IsNotEmpty()
  @Optional()
  secret: string;
}
