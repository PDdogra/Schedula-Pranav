import { Test, TestingModule } from '@nestjs/testing';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { DoctorsService } from '../doctors/doctors.service';

describe('AvailabilityController', () => {
  let controller: AvailabilityController;

  const mockAvailabilityService = {
    addAvailability: jest.fn(),
    getAvailabilityByDoctor: jest.fn(),
  };

  const mockDoctorsService = {
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvailabilityController],
      providers: [
        {
          provide: AvailabilityService,
          useValue: mockAvailabilityService,
        },
        {
          provide: DoctorsService,
          useValue: mockDoctorsService,
        },
      ],
    }).compile();

    controller = module.get<AvailabilityController>(AvailabilityController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addAvailability', () => {
    it('should get doctor profile and call addAvailability', async () => {
      const req = { user: { userId: 'user-id' } };
      const dto = { date: '2024-12-01', startTime: '09:00', endTime: '10:00' };
      const doctor = { id: 'doc-id' };
      const expectedResult = { id: 'avail-1', ...dto };

      mockDoctorsService.getProfile.mockResolvedValue(doctor);
      mockAvailabilityService.addAvailability.mockResolvedValue(expectedResult);

      const result = await controller.addAvailability(req, dto);

      expect(result).toEqual(expectedResult);
      expect(mockDoctorsService.getProfile).toHaveBeenCalledWith('user-id');
      expect(mockAvailabilityService.addAvailability).toHaveBeenCalledWith('doc-id', dto);
    });
  });

  describe('getDoctorAvailability', () => {
    it('should call getAvailabilityByDoctor', async () => {
      const doctorId = 'doc-id';
      const expectedResult = [{ id: 'avail-1' }];

      mockAvailabilityService.getAvailabilityByDoctor.mockResolvedValue(expectedResult);

      const result = await controller.getDoctorAvailability(doctorId);

      expect(result).toEqual(expectedResult);
      expect(mockAvailabilityService.getAvailabilityByDoctor).toHaveBeenCalledWith(doctorId);
    });
  });
});
