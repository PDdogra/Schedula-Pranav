import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Doctor } from '../doctors/doctor.entity';
import { Patient } from '../patients/patient.entity';
import { Availability } from '../availability/availability.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async bookAppointment(patientId: string, createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, availabilityId, notes } = createAppointmentDto;

    // Check if availability exists and is not booked
    const availability = await this.availabilityRepository.findOne({ where: { id: availabilityId } });
    
    if (!availability) {
      throw new NotFoundException('Availability slot not found');
    }

    if (availability.isBooked) {
      throw new ConflictException('This slot is already booked');
    }

    // Mark availability as booked
    availability.isBooked = true;
    await this.availabilityRepository.save(availability);

    // Create appointment
    const appointment = this.appointmentsRepository.create({
      doctor: { id: doctorId } as Doctor,
      patient: { id: patientId } as Patient,
      availability,
      notes,
    });

    return this.appointmentsRepository.save(appointment);
  }

  async getPatientAppointments(patientId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { patient: { id: patientId } },
      relations: { doctor: true, availability: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getDoctorAppointments(doctorId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { doctor: { id: doctorId } },
      relations: { patient: true, availability: true },
      order: { createdAt: 'DESC' },
    });
  }
}
