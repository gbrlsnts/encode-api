import { IsNotEmpty, IsOptional, IsUrl, ValidateIf } from 'class-validator';
import { jobUrlValidation, validProtocols } from 'src/config';
import { FtpStorageDto, HttpStorageDto, S3StorageDto } from './storage';

export class JobResourceDto {
  @IsUrl(jobUrlValidation(validProtocols))
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @ValidateIf(
    (o: JobResourceDto) =>
      o.url?.startsWith('ftp') || o.url?.startsWith('ftps'),
  )
  @IsOptional()
  ftp: FtpStorageDto;

  @IsNotEmpty()
  @ValidateIf((o: JobResourceDto) => o.url?.startsWith('s3'))
  @IsOptional()
  s3: S3StorageDto;

  @IsNotEmpty()
  @ValidateIf(
    (o: JobResourceDto) =>
      o.url?.startsWith('http') || o.url?.startsWith('https'),
  )
  @IsOptional()
  http: HttpStorageDto;
}
