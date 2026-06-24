import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';



import { CreateAssessmentInputDto } from './dto/create-assessment-input.dto';
import { AssessmentInputsService } from './assessment-inputs.service';

@ApiTags('Assessment Inputs')
@Controller('assessment-inputs')
export class AssessmentInputsController {
  constructor(
    private readonly assessmentInputsService: AssessmentInputsService,
  ) {}

  @Post('/assessment/:assessmentId')
  @ApiOperation({
    summary: 'Create input for assessment',
  })
  create(
    @Param(
      'assessmentId',
      ParseUUIDPipe,
    )
    assessmentId: string,

    @Body()
    dto: CreateAssessmentInputDto,
  ) {
    return this.assessmentInputsService.create(
      assessmentId,
      dto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Get all assessment inputs',
  })
  findAll() {
    return this.assessmentInputsService.findAll();
  }

  @Get('/assessment/:assessmentId')
  @ApiOperation({
    summary: 'Get inputs by assessment',
  })
  findByAssessment(
    @Param(
      'assessmentId',
      ParseUUIDPipe,
    )
    assessmentId: string,
  ) {
    return this.assessmentInputsService.findByAssessment(
      assessmentId,
    );
  }
}