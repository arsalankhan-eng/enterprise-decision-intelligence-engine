import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';



import { Assessment } from '../../assessments/entities/assessment.entity';
import { BaseEntity } from '../../../modules/projects/entities/base.entity';

import { AgentRunStatus } from '../enums/agent-run-status.enum';
import { Decision } from '../../../modules/decisions/entities/decision.entity';

@Entity('agent_runs')
export class AgentRun extends BaseEntity {
    @Column({
        type: 'enum',
        enum: AgentRunStatus,
        default: AgentRunStatus.PENDING,
    })
    status!: AgentRunStatus;

    @Column({
        nullable: true,
    })
    modelUsed?: string;

    @Column({
        nullable: true,
    })
    executionTimeMs?: number;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    startedAt?: Date;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    completedAt?: Date;

    @ManyToOne(
        () => Assessment,
        {
            nullable: false,
            onDelete: 'CASCADE',
        },
    )
    @JoinColumn({
        name: 'assessmentId',
    })
    assessment!: Assessment;

    @Column()
    assessmentId!: string;

    @OneToMany(
  () => Decision,
  (decision) => decision.agentRun,
)
decisions!: Decision[];
}