import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { OutputFormat, OutputVideoCodec, OutputAudioCodec } from '../types/';
import {
  maxEncodingWidth,
  maxEncodingHeight,
  maxAudioBitrate,
  maxVideoBitrate,
} from '../../config/job';

export class JobOutputDto {
  @IsIn(Object.keys(OutputFormat))
  format: OutputFormat;

  @IsIn(Object.keys(OutputVideoCodec))
  @IsOptional()
  videocodec?: OutputVideoCodec;

  @IsOptional()
  @IsPositive()
  @Max(maxVideoBitrate)
  videoBitrate?: number;

  @IsOptional()
  @Min(0)
  @Max(51)
  crf?: number;

  @IsOptional()
  @IsPositive()
  @Max(maxEncodingWidth)
  width?: number;

  @IsOptional()
  @IsPositive()
  @Max(maxEncodingHeight)
  height?: number;

  @IsOptional()
  @IsBoolean()
  twoPass?: boolean;

  @IsIn(Object.keys(OutputAudioCodec))
  @IsOptional()
  audioCodec?: OutputAudioCodec;

  @IsOptional()
  @IsPositive()
  @Max(maxAudioBitrate)
  audioBitrate?: number;
}
