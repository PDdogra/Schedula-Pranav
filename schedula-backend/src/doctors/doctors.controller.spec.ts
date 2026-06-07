import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';

describe('DoctorsController', () => {
  let controller: DoctorsController;

  const mockDoctorsService = {
    createProfile: jest.fn(),
    getProfile: jest.fn(),
    getAllDoctors: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorsController],
      providers: [
        {
          provide: DoctorsService,
          useValue: mockDoctorsService,
        },
      ],
    }).compile();

    controller = module.get<DoctorsController>(DoctorsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProfile', () => {
    it('should call doctorsService.createProfile', async () => {
      const req = { user: { userId: 'user-id' } };
      const dto = { specialization: 'Cardio', licenseNumber: '123', yearsExperience: 5 };
      const expectedResult = { id: 'doc-1', ...dto };

      mockDoctorsService.createProfile.mockResolvedValue(expectedResult);

      const result = await controller.createProfile(req, dto);

      expect(result).toEqual(expectedResult);
      expect(mockDoctorsService.createProfile).toHaveBeenCalledWith({ id: 'user-id' }, dto);
    });
  });

  describe('getProfile', () => {
    it('should call doctorsService.getProfile', async () => {
      const req = { user: { userId: 'user-id' } };
      const expectedResult = { id: 'doc-1' };

      mockDoctorsService.getProfile.mockResolvedValue(expectedResult);

      const result = await controller.getProfile(req);

      expect(result).toEqual(expectedResult);
      expect(mockDoctorsService.getProfile).toHaveBeenCalledWith('user-id');
    });
  });

  describe('getAllDoctors', () => {
    it('should call doctorsService.getAllDoctors', async () => {
      const expectedResult = [{ id: 'doc-1' }];

      mockDoctorsService.getAllDoctors.mockResolvedValue(expectedResult);

      const result = await controller.getAllDoctors();

      expect(result).toEqual(expectedResult);
      expect(mockDoctorsService.getAllDoctors).toHaveBeenCalled();
    });
  });
});
