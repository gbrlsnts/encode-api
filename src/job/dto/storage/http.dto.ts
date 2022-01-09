import { IsNotEmpty } from 'class-validator';

export class HttpStorageDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
