import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { Doctor } from '../doctors/doctor.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  async addAvailability(doctorId: string, createAvailabilityDto: CreateAvailabilityDto): Promise<Availability> {
    const availability = this.availabilityRepository.create({
      ...createAvailabilityDto,
      doctor: { id: doctorId } as Doctor,
    });
    return this.availabilityRepository.save(availability);
  }

  async getAvailabilityByDoctor(doctorId: string): Promise<Availability[]> {
    return this.availabilityRepository.find({
      where: { doctor: { id: doctorId } },
      order: { date: 'ASC', startTime: 'ASC' },
    });
  }
}
