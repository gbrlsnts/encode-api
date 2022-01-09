import { IsNotEmpty } from 'class-validator';

export class FtpStorageDto {
  @IsNotEmpty()
  uri: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
