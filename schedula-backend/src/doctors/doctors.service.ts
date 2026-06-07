import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { User } from '../users/user.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async createProfile(user: User, createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const existingDoctor = await this.doctorsRepository.findOne({ where: { user: { id: user.id } } });
    if (existingDoctor) {
      throw new ConflictException('Doctor profile already exists for this user');
    }

    const doctor = this.doctorsRepository.create({
      ...createDoctorDto,
      user,
    });

    return this.doctorsRepository.save(doctor);
  }

  async getProfile(userId: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor profile not found');
    }
    return doctor;
  }

  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorsRepository.find({ relations: { user: true } });
  }
}
