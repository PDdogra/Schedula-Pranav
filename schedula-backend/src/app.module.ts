import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { AvailabilityModule } from './availability/availability.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [UsersModule, DoctorsModule, PatientsModule, AppointmentsModule, AvailabilityModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
