import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AvailabilityService } from './availability.service';
import { Availability } from './availability.entity';

describe('AvailabilityService', () => {
  let service: AvailabilityService;

  const mockAvailabilityRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvailabilityService,
        {
          provide: getRepositoryToken(Availability),
          useValue: mockAvailabilityRepository,
        },
      ],
    }).compile();

    service = module.get<AvailabilityService>(AvailabilityService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addAvailability', () => {
    it('should create and return availability', async () => {
      const doctorId = 'doc-id';
      const dto = { date: '2024-12-01', startTime: '09:00', endTime: '10:00' };
      const expectedAvailability = { id: 'avail-id', doctor: { id: doctorId }, ...dto };

      mockAvailabilityRepository.create.mockReturnValue(expectedAvailability);
      mockAvailabilityRepository.save.mockResolvedValue(expectedAvailability);

      const result = await service.addAvailability(doctorId, dto);

      expect(result).toEqual(expectedAvailability);
      expect(mockAvailabilityRepository.create).toHaveBeenCalledWith({ ...dto, doctor: { id: doctorId } });
      expect(mockAvailabilityRepository.save).toHaveBeenCalledWith(expectedAvailability);
    });
  });

  describe('getAvailabilityByDoctor', () => {
    it('should return an array of availabilities for a doctor', async () => {
      const doctorId = 'doc-id';
      const expectedAvailabilities = [{ id: 'avail-1' }, { id: 'avail-2' }];

      mockAvailabilityRepository.find.mockResolvedValue(expectedAvailabilities);

      const result = await service.getAvailabilityByDoctor(doctorId);

      expect(result).toEqual(expectedAvailabilities);
      expect(mockAvailabilityRepository.find).toHaveBeenCalledWith({
        where: { doctor: { id: doctorId } },
        order: { date: 'ASC', startTime: 'ASC' },
      });
    });
  });
});
