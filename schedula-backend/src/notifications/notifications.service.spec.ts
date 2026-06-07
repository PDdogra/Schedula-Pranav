import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { NotificationType } from '../enums/notification-type.enum';
import { NotFoundException } from '@nestjs/common';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockNotificationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useValue: mockNotificationRepository,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNotification', () => {
    it('should create and return a notification', async () => {
      const userId = 'user-id';
      const dto = { title: 'Test', message: 'Message', type: NotificationType.INFO };
      const expectedNotification = { id: 'notif-id', user: { id: userId }, ...dto };

      mockNotificationRepository.create.mockReturnValue(expectedNotification);
      mockNotificationRepository.save.mockResolvedValue(expectedNotification);

      const result = await service.createNotification(userId, dto);

      expect(result).toEqual(expectedNotification);
      expect(mockNotificationRepository.create).toHaveBeenCalledWith({ ...dto, user: { id: userId } });
      expect(mockNotificationRepository.save).toHaveBeenCalledWith(expectedNotification);
    });
  });

  describe('getUserNotifications', () => {
    it('should return all notifications for a user', async () => {
      const userId = 'user-id';
      const expectedNotifications = [{ id: 'notif-1' }];

      mockNotificationRepository.find.mockResolvedValue(expectedNotifications);

      const result = await service.getUserNotifications(userId);

      expect(result).toEqual(expectedNotifications);
      expect(mockNotificationRepository.find).toHaveBeenCalledWith({
        where: { user: { id: userId } },
        order: { createdAt: 'DESC' },
      });
    });
  });

  describe('markAsRead', () => {
    it('should mark a notification as read', async () => {
      const userId = 'user-id';
      const notificationId = 'notif-id';
      const notification = { id: notificationId, isRead: false };

      mockNotificationRepository.findOne.mockResolvedValue(notification);
      mockNotificationRepository.save.mockResolvedValue({ ...notification, isRead: true });

      const result = await service.markAsRead(notificationId, userId);

      expect(result.isRead).toBe(true);
      expect(mockNotificationRepository.findOne).toHaveBeenCalledWith({
        where: { id: notificationId, user: { id: userId } },
      });
      expect(mockNotificationRepository.save).toHaveBeenCalledWith({ ...notification, isRead: true });
    });

    it('should throw NotFoundException if notification not found', async () => {
      mockNotificationRepository.findOne.mockResolvedValue(null);

      await expect(service.markAsRead('notif-id', 'user-id')).rejects.toThrow(NotFoundException);
    });
  });
});
