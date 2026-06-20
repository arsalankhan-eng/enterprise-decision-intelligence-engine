import { Entity, Column,  } from 'typeorm';


import { ProjectStatus } from '../enums/project-status.enum';
import { BaseEntity } from './base.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.DRAFT,
  })
  status!: ProjectStatus;
}