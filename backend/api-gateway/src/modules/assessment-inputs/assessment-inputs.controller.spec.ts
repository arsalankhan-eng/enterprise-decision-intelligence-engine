import { Test, TestingModule } from '@nestjs/testing';
import { AssessmentInputsController } from './assessment-inputs.controller';

describe('AssessmentInputsController', () => {
  let controller: AssessmentInputsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssessmentInputsController],
    }).compile();

    controller = module.get<AssessmentInputsController>(AssessmentInputsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
