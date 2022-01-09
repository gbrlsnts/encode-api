import { IsNotEmpty } from 'class-validator';

export class S3StorageDto {
  @IsNotEmpty()
  key: string;

  @IsNotEmpty()
  secret: string;
}
