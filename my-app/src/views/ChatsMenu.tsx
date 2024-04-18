import {useEffect, useState} from 'react';
import {useChat, useUser} from '../hooks/apiHooks';
import {useChatContext, useUserContext} from '../hooks/ContextHooks';
import {ChatResponse} from '../types/MessageTypes';
import {UserWithNoPassword} from '../types/DBtypes';
import {useNavigate} from 'react-router-dom';

const ChatsMenu = () => {
  const {getChatConversations} = useChat();
  const {handleSetChatId} = useChatContext();
  const {getUserById} = useUser();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<ChatResponse[]>([]);
  const [chatUsers, setChatUsers] = useState<(UserWithNoPassword | null)[]>([]);
  const {user} = useUserContext();

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      const chats = await getChatConversations(token);
      if (!chats) {
        return;
      }

      const usersObjects = chats.map(async (chat) => {
        if (!user) {
          return null;
        }
        const otherUser =
          chat.receiver_id === user.user_id ? chat.sender_id : chat.receiver_id;
        const otherUserObject = await getUserById(otherUser);

        return otherUserObject;
      });

      const resolvedUsersObjects = await Promise.all(usersObjects);
      setConversations(chats);
      const chatUsers = resolvedUsersObjects.filter((user) => user !== null);
      if (!chatUsers) {
        return;
      }
      setChatUsers(chatUsers);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleOpenMessages = (chat_id: number) => {
    handleSetChatId(chat_id);
    navigate(`/messages`);
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);

  return (
    <div className="p-header">
      <h2>Chats Menu</h2>
      <ul>
        {conversations.map((chat: ChatResponse) => (
          <li
            onClick={() => handleOpenMessages(chat.chat_id)}
            key={chat.chat_id ? chat.chat_id : 'chat'}
          >
            <h3>
              {
                chatUsers.find(
                  (user) =>
                    user?.user_id === chat.sender_id ||
                    user?.user_id === chat.receiver_id,
                )?.username
              }
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatsMenu;
