import { Controller, Post, Get, Body, Request, UseGuards, Param } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { DoctorsService } from '../doctors/doctors.service';

@Controller('availability')
export class AvailabilityController {
  constructor(
    private readonly availabilityService: AvailabilityService,
    private readonly doctorsService: DoctorsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addAvailability(@Request() req: any, @Body() createAvailabilityDto: CreateAvailabilityDto) {
    // Make sure the user is a doctor and get their doctor ID
    const doctor = await this.doctorsService.getProfile(req.user.userId);
    return this.availabilityService.addAvailability(doctor.id, createAvailabilityDto);
  }

  @Get('doctor/:doctorId')
  async getDoctorAvailability(@Param('doctorId') doctorId: string) {
    return this.availabilityService.getAvailabilityByDoctor(doctorId);
  }
}
