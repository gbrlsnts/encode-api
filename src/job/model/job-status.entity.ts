import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  order: number;
}
