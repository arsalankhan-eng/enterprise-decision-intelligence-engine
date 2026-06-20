import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';



import { Project } from '../../projects/entities/project.entity';
import { BaseEntity } from 'src/modules/projects/entities/base.entity';
import { AssessmentStatus } from '../enum/assessment-status.enum';


@Entity('assessments')
export class Assessment extends BaseEntity {
  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  scenario!: string;

  @Column()
  industry!: string;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  budget?: number;

  @Column({
    nullable: true,
  })
  timelineMonths?: number;

  @Column({
    type: 'enum',
    enum: AssessmentStatus,
    default: AssessmentStatus.DRAFT,
  })
  status!: AssessmentStatus;

  @ManyToOne(
    () => Project,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'projectId',
  })
  project!: Project;

  @Column()
  projectId!: string;
}