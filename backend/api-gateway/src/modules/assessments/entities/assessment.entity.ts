import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';



import { Project } from '../../projects/entities/project.entity';
import { BaseEntity } from '../../../modules/projects/entities/base.entity';
import { AssessmentStatus } from '../enum/assessment-status.enum';
import { AgentRun } from 'src/modules/agent-runs/entities/agent-run.entity';


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

  @OneToMany(
  () => AgentRun,
  (agentRun) => agentRun.assessment,
)
agentRuns!: AgentRun[];

  @Column()
  projectId!: string;
}