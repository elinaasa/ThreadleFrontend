// Notifications.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Notifications from '../src/views/Notifications';
import { useNotifications } from '../src/hooks/apiHooks';

jest.mock('../hooks/apiHooks'); // Mock the useNotifications hook

describe('Notifications component', () => {
  beforeEach(() => {
    // Mock the implementation of useNotifications for each test
    useNotifications.mockReturnValue({
      getNotifications: jest.fn().mockResolvedValue([
        { notification_id: 1, message: 'Notification 1', created_at: new Date() },
        { notification_id: 2, message: 'Notification 2', created_at: new Date() },
      ]),
      markNotificationAsRead: jest.fn().mockResolvedValue(true),
    });
  });

  it('renders notifications correctly', async () => {
    const { getByText, getByAltText } = render(<Notifications />);

    // Wait for notifications to be fetched and rendered
    await waitFor(() => {
      expect(getByText('Notifications')).toBeInTheDocument();
      expect(getByText('Notification 1')).toBeInTheDocument();
      expect(getByText('Notification 2')).toBeInTheDocument();
    });

    // Check if markAsRead function is called when icon is clicked
    fireEvent.click(getByAltText('mark as read icon'));
    expect(useNotifications().markNotificationAsRead).toHaveBeenCalled();
  });
});
