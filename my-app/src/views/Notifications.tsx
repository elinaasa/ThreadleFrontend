import {useEffect, useState} from 'react';
import {useNotifications} from '../hooks/apiHooks';
import {Notification} from '../types/DBtypes';
import {formatDistanceToNow} from 'date-fns';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[] | null>([]);
  const {getNotifications, markNotificationAsRead} = useNotifications();

  const fetchNotifications = async () => {
    setNotifications([]);
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    const notifications = await getNotifications(token);
    setNotifications(notifications);
  };

  const markAsRead = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    await markNotificationAsRead(token, id);
    await fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);
  return (
    <div className="p-header">
      <h1>Notifications</h1>
      <ul className="notification-list">
        {notifications?.map((notification) => (
          <li key={notification.notification_id} className="notification-item">
            <div>
              <label>{notification.message}</label>
              <label>{formatDistanceToNow(notification.created_at)}</label>
            </div>
            <div onClick={() => markAsRead(notification.notification_id)}>
              <img
                className="mark-as-read"
                src="../silma.svg"
                alt="mark as read icon"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Notifications;
