import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async createProfile(@Request() req: any, @Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.createProfile({ id: req.user.userId } as any, createPatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.patientsService.getProfile(req.user.userId);
  }
}
