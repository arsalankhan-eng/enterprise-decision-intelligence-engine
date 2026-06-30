import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';



import { AgentRun } from '../../agent-runs/entities/agent-run.entity';

import { DecisionStatus } from '../enums/decision-status.enum';
import { BaseEntity } from '../../../modules/projects/entities/base.entity';
import { DecisionPriority } from 'src/modules/decision-engine/enums/decision-priority.enum';

@Entity('decisions')
export class Decision extends BaseEntity {
  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  summary!: string;

  @Column({
    type: 'text',
  })
  recommendation!: string;

  @Column({
    nullable: true,
  })
  confidenceScore?: number;

  @Column({
    type: 'enum',
    enum: DecisionStatus,
    default: DecisionStatus.DRAFT,
  })
  status!: DecisionStatus;

  @ManyToOne(
    () => AgentRun,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'agentRunId',
  })
  agentRun!: AgentRun;

  @Column()
  agentRunId!: string;

  @Column({
  type: 'enum',
  enum: DecisionPriority,
   nullable: true,
})
priority!: DecisionPriority;

@Column({
  type: 'text',
   nullable: true,
})
businessImpact!: string;
}