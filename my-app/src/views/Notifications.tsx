import {useEffect, useState} from 'react';
import {useNotifications} from '../hooks/apiHooks';
import {Notification} from '../types/DBtypes';

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
      <ul>
        {notifications?.map((notification) => {
          return (
            <li key={notification.notification_id}>
              <div>
                <label>{notification.message}</label>
                <label>{String(notification.created_at)}</label>
                <button
                  onClick={() => markAsRead(notification.notification_id)}
                >
                  Silmä ikoni tähän
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Notifications;
