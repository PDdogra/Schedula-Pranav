import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

describe('PatientsController', () => {
  let controller: PatientsController;

  const mockPatientsService = {
    createProfile: jest.fn(),
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: mockPatientsService,
        },
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProfile', () => {
    it('should call patientsService.createProfile', async () => {
      const req = { user: { userId: 'user-id' } };
      const dto = { bloodType: 'O+' };
      const expectedResult = { id: 'pat-1', ...dto };

      mockPatientsService.createProfile.mockResolvedValue(expectedResult);

      const result = await controller.createProfile(req, dto);

      expect(result).toEqual(expectedResult);
      expect(mockPatientsService.createProfile).toHaveBeenCalledWith({ id: 'user-id' }, dto);
    });
  });

  describe('getProfile', () => {
    it('should call patientsService.getProfile', async () => {
      const req = { user: { userId: 'user-id' } };
      const expectedResult = { id: 'pat-1' };

      mockPatientsService.getProfile.mockResolvedValue(expectedResult);

      const result = await controller.getProfile(req);

      expect(result).toEqual(expectedResult);
      expect(mockPatientsService.getProfile).toHaveBeenCalledWith('user-id');
    });
  });
});
