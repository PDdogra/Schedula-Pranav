import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async createProfile(@Request() req: any, @Body() createDoctorDto: CreateDoctorDto) {
    // In a real app, you'd fetch the full User entity from UsersService using req.user.userId
    // For simplicity, passing a partial user to save relation
    return this.doctorsService.createProfile({ id: req.user.userId } as any, createDoctorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.doctorsService.getProfile(req.user.userId);
  }

  @Get()
  async getAllDoctors() {
    return this.doctorsService.getAllDoctors();
  }
}
