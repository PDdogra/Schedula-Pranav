import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>,
  ) {}

  async createProfile(user: User, createPatientDto: CreatePatientDto): Promise<Patient> {
    const existingPatient = await this.patientsRepository.findOne({ where: { user: { id: user.id } } });
    if (existingPatient) {
      throw new ConflictException('Patient profile already exists for this user');
    }

    const patient = this.patientsRepository.create({
      ...createPatientDto,
      user,
    });

    return this.patientsRepository.save(patient);
  }

  async getProfile(userId: string): Promise<Patient> {
    const patient = await this.patientsRepository.findOne({
      where: { user: { id: userId } },
      relations: { user: true },
    });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }
    return patient;
  }
}
