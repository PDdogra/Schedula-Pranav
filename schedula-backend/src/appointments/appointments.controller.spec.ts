import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';

describe('AppointmentsController', () => {
  let controller: AppointmentsController;

  const mockAppointmentsService = {
    bookAppointment: jest.fn(),
    getPatientAppointments: jest.fn(),
    getDoctorAppointments: jest.fn(),
  };

  const mockPatientsService = {
    getProfile: jest.fn(),
  };

  const mockDoctorsService = {
    getProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [
        {
          provide: AppointmentsService,
          useValue: mockAppointmentsService,
        },
        {
          provide: PatientsService,
          useValue: mockPatientsService,
        },
        {
          provide: DoctorsService,
          useValue: mockDoctorsService,
        },
      ],
    }).compile();

    controller = module.get<AppointmentsController>(AppointmentsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('bookAppointment', () => {
    it('should get patient profile and book appointment', async () => {
      const req = { user: { userId: 'user-id' } };
      const dto = { doctorId: 'doc-id', availabilityId: 'avail-id' };
      const patient = { id: 'pat-id' };
      const expectedResult = { id: 'appt-1', ...dto };

      mockPatientsService.getProfile.mockResolvedValue(patient);
      mockAppointmentsService.bookAppointment.mockResolvedValue(expectedResult);

      const result = await controller.bookAppointment(req, dto);

      expect(result).toEqual(expectedResult);
      expect(mockPatientsService.getProfile).toHaveBeenCalledWith('user-id');
      expect(mockAppointmentsService.bookAppointment).toHaveBeenCalledWith('pat-id', dto);
    });
  });

  describe('getMyPatientAppointments', () => {
    it('should fetch patient profile and get appointments', async () => {
      const req = { user: { userId: 'user-id' } };
      const patient = { id: 'pat-id' };
      const expectedResult = [{ id: 'appt-1' }];

      mockPatientsService.getProfile.mockResolvedValue(patient);
      mockAppointmentsService.getPatientAppointments.mockResolvedValue(expectedResult);

      const result = await controller.getMyPatientAppointments(req);

      expect(result).toEqual(expectedResult);
      expect(mockAppointmentsService.getPatientAppointments).toHaveBeenCalledWith('pat-id');
    });
  });

  describe('getMyDoctorAppointments', () => {
    it('should fetch doctor profile and get appointments', async () => {
      const req = { user: { userId: 'user-id' } };
      const doctor = { id: 'doc-id' };
      const expectedResult = [{ id: 'appt-1' }];

      mockDoctorsService.getProfile.mockResolvedValue(doctor);
      mockAppointmentsService.getDoctorAppointments.mockResolvedValue(expectedResult);

      const result = await controller.getMyDoctorAppointments(req);

      expect(result).toEqual(expectedResult);
      expect(mockAppointmentsService.getDoctorAppointments).toHaveBeenCalledWith('doc-id');
    });
  });
});
