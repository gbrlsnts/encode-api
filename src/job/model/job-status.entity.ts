import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobStatus {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  @Exclude()
  order: number;
}

/**
 * Available statuses
 */
export const JobStatusAvailable = {
  QUEUE: 'QUEUE',
  DOWNLOAD: 'DOWNLOAD',
  ENCODE: 'ENCODE',
  SAVE: 'SAVE',
  COMPLETE: 'COMPLETE',
  FAIL: 'FAIL',
};
