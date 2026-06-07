import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { PatientsService } from '../patients/patients.service';
import { DoctorsService } from '../doctors/doctors.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async bookAppointment(@Request() req: any, @Body() createAppointmentDto: CreateAppointmentDto) {
    // Assuming the user is a patient
    const patient = await this.patientsService.getProfile(req.user.userId);
    return this.appointmentsService.bookAppointment(patient.id, createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('patient')
  async getMyPatientAppointments(@Request() req: any) {
    const patient = await this.patientsService.getProfile(req.user.userId);
    return this.appointmentsService.getPatientAppointments(patient.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('doctor')
  async getMyDoctorAppointments(@Request() req: any) {
    const doctor = await this.doctorsService.getProfile(req.user.userId);
    return this.appointmentsService.getDoctorAppointments(doctor.id);
  }
}
