import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NotificationType } from '../../enums/notification-type.enum';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsEnum(NotificationType)
  type: NotificationType;
}
