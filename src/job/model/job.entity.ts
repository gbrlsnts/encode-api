import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { JobStatus } from './job-status.entity';
import { JobMultiOutputDto } from '../dto';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude()
  statusId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'json' })
  query: JobMultiOutputDto;

  @ManyToOne(() => JobStatus)
  @Transform(({ value }) => value.code)
  status: JobStatus;
}
