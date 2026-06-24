import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';


import { Assessment } from '../../assessments/entities/assessment.entity';


import { InputPriority } from '../enums/input-priority.enum';
import { BaseEntity } from '../../../modules/projects/entities/base.entity';
import { InputType } from '../enums/input-type-enum';

@Entity('assessment_inputs')
export class AssessmentInput extends BaseEntity {
  @Column({
    type: 'enum',
    enum: InputType,
  })
  type!: InputType;

  @Column({
    type: 'enum',
    enum: InputPriority,
    default: InputPriority.MEDIUM,
  })
  priority!: InputPriority;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  description!: string;

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
}