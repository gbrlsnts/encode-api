import {
  OutputFormat,
  OutputVideoCodec,
  OutputAudioCodec,
} from '../types/encoding.type';

export class JobOutput {
  format: OutputFormat;
  videocodec?: OutputVideoCodec;
  videoBitrate?: number;
  crf?: number;
  width?: number;
  height?: number;
  twoPass?: boolean;
  audioCodec?: OutputAudioCodec;
  audioBitrate?: number;
}
