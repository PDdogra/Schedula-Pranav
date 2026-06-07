import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';
import { Availability } from '../availability/availability.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { AppointmentStatus } from '../enums/appointment-status.enum';

describe('AppointmentsService', () => {
  let service: AppointmentsService;

  const mockAppointmentRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockAvailabilityRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointment),
          useValue: mockAppointmentRepository,
        },
        {
          provide: getRepositoryToken(Availability),
          useValue: mockAvailabilityRepository,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('bookAppointment', () => {
    it('should book an appointment and update availability', async () => {
      const patientId = 'pat-id';
      const dto = { doctorId: 'doc-id', availabilityId: 'avail-id', notes: 'Checkup' };
      const availability = { id: 'avail-id', isBooked: false };
      const expectedAppointment = { id: 'appt-id', status: AppointmentStatus.PENDING, ...dto };

      mockAvailabilityRepository.findOne.mockResolvedValue(availability);
      mockAppointmentRepository.create.mockReturnValue(expectedAppointment);
      mockAppointmentRepository.save.mockResolvedValue(expectedAppointment);

      const result = await service.bookAppointment(patientId, dto);

      expect(result).toEqual(expectedAppointment);
      expect(availability.isBooked).toBe(true);
      expect(mockAvailabilityRepository.save).toHaveBeenCalledWith(availability);
      expect(mockAppointmentRepository.create).toHaveBeenCalledWith({
        doctor: { id: dto.doctorId },
        patient: { id: patientId },
        availability,
        notes: dto.notes,
      });
      expect(mockAppointmentRepository.save).toHaveBeenCalledWith(expectedAppointment);
    });

    it('should throw NotFoundException if availability not found', async () => {
      mockAvailabilityRepository.findOne.mockResolvedValue(null);

      await expect(service.bookAppointment('pat-id', { doctorId: 'doc-id', availabilityId: 'avail-id' })).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if slot is already booked', async () => {
      const availability = { id: 'avail-id', isBooked: true };
      mockAvailabilityRepository.findOne.mockResolvedValue(availability);

      await expect(service.bookAppointment('pat-id', { doctorId: 'doc-id', availabilityId: 'avail-id' })).rejects.toThrow(ConflictException);
    });
  });

  describe('getPatientAppointments', () => {
    it('should return appointments for a patient', async () => {
      const patientId = 'pat-id';
      const expectedAppointments = [{ id: 'appt-1' }];

      mockAppointmentRepository.find.mockResolvedValue(expectedAppointments);

      const result = await service.getPatientAppointments(patientId);

      expect(result).toEqual(expectedAppointments);
      expect(mockAppointmentRepository.find).toHaveBeenCalledWith({
        where: { patient: { id: patientId } },
        relations: { doctor: true, availability: true },
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('getDoctorAppointments', () => {
    it('should return appointments for a doctor', async () => {
      const doctorId = 'doc-id';
      const expectedAppointments = [{ id: 'appt-1' }];

      mockAppointmentRepository.find.mockResolvedValue(expectedAppointments);

      const result = await service.getDoctorAppointments(doctorId);

      expect(result).toEqual(expectedAppointments);
      expect(mockAppointmentRepository.find).toHaveBeenCalledWith({
        where: { doctor: { id: doctorId } },
        relations: { patient: true, availability: true },
        order: { createdAt: 'DESC' },
      });
    });
  });
});
