import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateLeadDto } from '../src/modules/leads/dto/create-lead.dto.js';

describe('CreateLeadDto', () => {
  it('rejects invalid email, empty services and a short description', async () => {
    const dto = plainToInstance(CreateLeadDto, {
      name: 'A',
      email: 'not-email',
      startupStage: 'UNKNOWN',
      servicesNeeded: [],
      budgetRange: 'FREE',
      projectDescription: 'short',
      submissionToken: 'bad',
    });
    const errors = await validate(dto);
    expect(errors.map((error) => error.property)).toEqual(
      expect.arrayContaining([
        'name',
        'email',
        'startupStage',
        'servicesNeeded',
        'budgetRange',
        'projectDescription',
        'submissionToken',
      ]),
    );
  });
});
