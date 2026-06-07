import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Availability } from '../availability/availability.entity';
import { Appointment } from '../appointments/appointment.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, user => user.doctor, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  specialization: string;

  @Column({ unique: true })
  licenseNumber: string;

  @Column('int')
  yearsExperience: number;

  @Column('text', { nullable: true })
  bio: string;

  @OneToMany(() => Availability, availability => availability.doctor)
  availabilities: Availability[];

  @OneToMany(() => Appointment, appointment => appointment.doctor)
  appointments: Appointment[];
}
