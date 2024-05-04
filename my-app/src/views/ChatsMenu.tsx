import {useEffect, useState} from 'react';
import {useChat, useUser, useMedia} from '../hooks/apiHooks'; // Assuming useMedia is exported from apiHooks
import {useChatContext, useUserContext} from '../hooks/ContextHooks';
import {ChatResponse} from '../types/MessageTypes';
import {MediaItemWithOwner, UserWithNoPassword} from '../types/DBtypes';
import {useNavigate} from 'react-router-dom';

const ChatsMenu = () => {
  const {getChatConversations} = useChat();
  const {handleSetChatId} = useChatContext();
  const {getUserById} = useUser();
  const {getMediaById} = useMedia(); // Use the custom hook here
  const navigate = useNavigate();

  const [conversations, setConversations] = useState<ChatResponse[]>([]);
  const [chatPosts, setChatPosts] = useState<MediaItemWithOwner[]>([]);
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

      let usersObjects = [];
      const postIds: number[] = [];

      if (!('message' in chats)) {
        usersObjects = chats.map(async (chat) => {
          if (!user) {
            return null;
          }
          const otherUser =
            chat.receiver_id === user.user_id
              ? chat.sender_id
              : chat.receiver_id;
          const otherUserObject = await getUserById(otherUser);

          if (chat.post_id !== null) {
            postIds.push(chat.post_id);
          }

          return otherUserObject;
        });
      } else {
        return;
      }

      const resolvedUsersObjects = await Promise.all(usersObjects);
      setConversations(chats);
      const chatUsers = resolvedUsersObjects.filter((user) => user !== null);
      if (!chatUsers) {
        return;
      }
      setChatUsers(chatUsers);

      const uniquePostIds = Array.from(new Set(postIds));

      // Fetch PostItem objects using getMediaById
      const postItemsPromises: Promise<MediaItemWithOwner>[] =
        uniquePostIds.map(async (postId) => {
          const mediaData = await getMediaById(postId);
          return {
            user_id: user?.user_id || 0,
            username: mediaData.username || '',
            filename: mediaData.filename || '',
            thumbnail: mediaData.thumbnail || '',
            filesize: mediaData.filesize || 0,
            media_type: mediaData.media_type || '',
            title: mediaData.title || '',
            description: mediaData.description || '',
            highlight: mediaData.highlight || false,
            created_at: new Date(mediaData.created_at) || new Date(),
            post_id: postId,
          };
        });

      const postItems = await Promise.all(postItemsPromises);
      setChatPosts(postItems);
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
      <ul className="chats-ul">
        {conversations && conversations.length > 0 ? (
          conversations.map((chat: ChatResponse) => (
            <li
              onClick={() => handleOpenMessages(chat.chat_id)}
              key={chat.chat_id ? chat.chat_id : 'chat'}
            >
              <div className="chats-post-container">
                {chatPosts.find((post) => post.post_id === chat.post_id) ? (
                  <div className="chat-post-container">
                    {chatPosts.find(
                      (post) => post.post_id === chat.post_id,
                    ) && (
                      <img
                        className="chat-thumbnail"
                        src={
                          chatPosts.find(
                            (post) => post.post_id === chat.post_id,
                          )?.thumbnail
                        }
                        alt="post thumbnail"
                      />
                    )}
                    <div className="post-info-container">
                      <h3>
                        {
                          chatUsers.find(
                            (user) =>
                              user?.user_id === chat.sender_id ||
                              user?.user_id === chat.receiver_id,
                          )?.username
                        }
                      </h3>
                      <p>
                        {
                          chatPosts.find(
                            (post) => post.post_id === chat.post_id,
                          )?.title
                        }
                      </p>
                    </div>
                  </div>
                ) : (
                  <h3 style={{margin: '0 0 0 10px'}}>
                    {
                      chatUsers.find(
                        (user) =>
                          user?.user_id === chat.sender_id ||
                          user?.user_id === chat.receiver_id,
                      )?.username
                    }
                  </h3>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>No chats found</li>
        )}
      </ul>
    </div>
  );
};

export default ChatsMenu;
