import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationType } from '../enums/notification-type.enum';

describe('NotificationsController', () => {
  let controller: NotificationsController;

  const mockNotificationsService = {
    createNotification: jest.fn(),
    getUserNotifications: jest.fn(),
    markAsRead: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: mockNotificationsService,
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNotification', () => {
    it('should call createNotification', async () => {
      const req = { user: { userId: 'user-id' } };
      const dto = { title: 'T', message: 'M', type: NotificationType.INFO };
      const expectedResult = { id: 'notif-1', ...dto };

      mockNotificationsService.createNotification.mockResolvedValue(expectedResult);

      const result = await controller.createNotification(req, dto);

      expect(result).toEqual(expectedResult);
      expect(mockNotificationsService.createNotification).toHaveBeenCalledWith('user-id', dto);
    });
  });

  describe('getUserNotifications', () => {
    it('should call getUserNotifications', async () => {
      const req = { user: { userId: 'user-id' } };
      const expectedResult = [{ id: 'notif-1' }];

      mockNotificationsService.getUserNotifications.mockResolvedValue(expectedResult);

      const result = await controller.getUserNotifications(req);

      expect(result).toEqual(expectedResult);
      expect(mockNotificationsService.getUserNotifications).toHaveBeenCalledWith('user-id');
    });
  });

  describe('markAsRead', () => {
    it('should call markAsRead', async () => {
      const req = { user: { userId: 'user-id' } };
      const notificationId = 'notif-id';
      const expectedResult = { id: notificationId, isRead: true };

      mockNotificationsService.markAsRead.mockResolvedValue(expectedResult);

      const result = await controller.markAsRead(req, notificationId);

      expect(result).toEqual(expectedResult);
      expect(mockNotificationsService.markAsRead).toHaveBeenCalledWith(notificationId, 'user-id');
    });
  });
});
