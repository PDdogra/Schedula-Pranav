import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';
import { Patient } from './patient.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('PatientsService', () => {
  let service: PatientsService;

  const mockPatientRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockPatientRepository,
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProfile', () => {
    it('should create and return a patient profile', async () => {
      const user = { id: 'user-id' } as any;
      const createDto = { bloodType: 'O+' };
      const expectedPatient = { id: 'pat-id', user, ...createDto };

      mockPatientRepository.findOne.mockResolvedValue(null);
      mockPatientRepository.create.mockReturnValue(expectedPatient);
      mockPatientRepository.save.mockResolvedValue(expectedPatient);

      const result = await service.createProfile(user, createDto);

      expect(result).toEqual(expectedPatient);
      expect(mockPatientRepository.findOne).toHaveBeenCalledWith({ where: { user: { id: user.id } } });
      expect(mockPatientRepository.create).toHaveBeenCalledWith({ ...createDto, user });
      expect(mockPatientRepository.save).toHaveBeenCalledWith(expectedPatient);
    });

    it('should throw ConflictException if profile already exists', async () => {
      const user = { id: 'user-id' } as any;
      mockPatientRepository.findOne.mockResolvedValue({ id: 'existing-pat' });

      await expect(service.createProfile(user, {})).rejects.toThrow(ConflictException);
    });
  });

  describe('getProfile', () => {
    it('should return a patient profile if found', async () => {
      const expectedPatient = { id: 'pat-id', bloodType: 'O+' };
      mockPatientRepository.findOne.mockResolvedValue(expectedPatient);

      const result = await service.getProfile('user-id');

      expect(result).toEqual(expectedPatient);
      expect(mockPatientRepository.findOne).toHaveBeenCalledWith({
        where: { user: { id: 'user-id' } },
        relations: { user: true },
      });
    });

    it('should throw NotFoundException if profile not found', async () => {
      mockPatientRepository.findOne.mockResolvedValue(null);

      await expect(service.getProfile('user-id')).rejects.toThrow(NotFoundException);
    });
  });
});
