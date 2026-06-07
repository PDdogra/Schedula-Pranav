import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DoctorsService } from './doctors.service';
import { Doctor } from './doctor.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('DoctorsService', () => {
  let service: DoctorsService;

  const mockDoctorRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: getRepositoryToken(Doctor),
          useValue: mockDoctorRepository,
        },
      ],
    }).compile();

    service = module.get<DoctorsService>(DoctorsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProfile', () => {
    it('should create and return a doctor profile', async () => {
      const user = { id: 'user-id' } as any;
      const createDto = { specialization: 'Cardio', licenseNumber: '123', yearsExperience: 5 };
      const expectedDoctor = { id: 'doc-id', user, ...createDto };

      mockDoctorRepository.findOne.mockResolvedValue(null); // Profile doesn't exist yet
      mockDoctorRepository.create.mockReturnValue(expectedDoctor);
      mockDoctorRepository.save.mockResolvedValue(expectedDoctor);

      const result = await service.createProfile(user, createDto);

      expect(result).toEqual(expectedDoctor);
      expect(mockDoctorRepository.findOne).toHaveBeenCalledWith({ where: { user: { id: user.id } } });
      expect(mockDoctorRepository.create).toHaveBeenCalledWith({ ...createDto, user });
      expect(mockDoctorRepository.save).toHaveBeenCalledWith(expectedDoctor);
    });

    it('should throw ConflictException if profile already exists', async () => {
      const user = { id: 'user-id' } as any;
      const createDto = { specialization: 'Cardio', licenseNumber: '123', yearsExperience: 5 };

      mockDoctorRepository.findOne.mockResolvedValue({ id: 'existing-doc' }); // Profile exists

      await expect(service.createProfile(user, createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('getProfile', () => {
    it('should return a doctor profile if found', async () => {
      const expectedDoctor = { id: 'doc-id', specialization: 'Cardio' };
      mockDoctorRepository.findOne.mockResolvedValue(expectedDoctor);

      const result = await service.getProfile('user-id');

      expect(result).toEqual(expectedDoctor);
      expect(mockDoctorRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 'user-id' } },
        relations: { user: true },
      });
    });

    it('should throw NotFoundException if profile not found', async () => {
      mockDoctorRepository.findOne.mockResolvedValue(null);

      await expect(service.getProfile('user-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllDoctors', () => {
    it('should return an array of doctors', async () => {
      const expectedDoctors = [{ id: 'doc-1' }, { id: 'doc-2' }];
      mockDoctorRepository.find.mockResolvedValue(expectedDoctors);

      const result = await service.getAllDoctors();

      expect(result).toEqual(expectedDoctors);
      expect(mockDoctorRepository.find).toHaveBeenCalledWith({ relations: { user: true } });
    });
  });
});
