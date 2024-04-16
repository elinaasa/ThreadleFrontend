import {useEffect, useRef, useState} from 'react';
// import {useUser} from '../hooks/apiHooks';
import {useChatContext, useUserContext} from '../hooks/ContextHooks';

import {useNavigate} from 'react-router-dom';
import {useForm} from '../hooks/formHooks';
import {useUser} from '../hooks/apiHooks';
import {ChatMessages, UserWithNoPassword} from '../types/DBtypes';

const Messages = () => {
  const {chatMessages, chatId, handleAddChatMessage, handleGetChatMessages} =
    useChatContext();
  // const {getUserById} = useUser();
  const {user} = useUserContext();
  const {getUserById} = useUser();
  const [otherUser, setOtherUser] = useState<UserWithNoPassword | null>(null);
  // const [chatUsers, setChatUsers] = useState<(UserWithNoPassword | null)[]>([]);
  const navigate = useNavigate();

  const initvalues = {
    message: '',
  };
  const messageEndRef = useRef<HTMLDivElement>(null);

  const doChat = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    handleAddChatMessage(token, inputs.message);
    // Empty input
    inputs.message = '';
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(doChat, initvalues);

  // Scroll to the bottom when chatMessages change
  useEffect(() => {
    if (!messageEndRef.current) return;

    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chatMessages]);

  useEffect(() => {
    if (chatMessages.length < 0 || !chatId) {
      navigate('/Chats');
    }
    handleGetChatMessages();
  }, []);

  const getOtherUserObj = async (chat: ChatMessages) => {
    if (!user || !chat) return;
    const otherUser =
      chat?.receiver_id === user?.user_id ? chat?.sender_id : chat?.receiver_id;
    const otherUserObject = await getUserById(otherUser);
    setOtherUser(otherUserObject);
    console.log('otheruser', otherUser);
  };

  useEffect(() => {
    if (!otherUser) {
      getOtherUserObj(chatMessages[0]);
    }
  }, [chatMessages[0]]);
  return (
    <main style={{maxWidth: '1300px'}} className="p-header">
      <div className="container">
        <div>
          <button onClick={() => navigate('/Chats')}>Back</button>
        </div>
        <ul className="chat-list">
          {chatMessages &&
            chatMessages.length > 0 &&
            chatMessages.map((chat, index) => {
              return (
                <li
                  key={index}
                  className={`message ${chat.receiver_id === user?.user_id ? 'message-sent' : 'message-received'}`}
                >
                  <div
                    className={`message-content ${chat.receiver_id === user?.user_id && 'message-sent'}`}
                  >
                    <div className="avatar">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <div className="message-details">
                      <p className="sender-name">
                        {chat.receiver_id === user?.user_id
                          ? `You`
                          : otherUser?.username}
                      </p>
                      <p className="message-text">{chat.message}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          <div ref={messageEndRef}></div>
        </ul>
      </div>

      <div className="message-form">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInputChange}
            className="input"
            placeholder="Type your message..."
            name="message"
            id="message"
            minLength={1}
            required
            maxLength={200}
            value={inputs.message}
          />
          <button className="submit-button">Send</button>
        </form>
      </div>
    </main>
  );
};
export default Messages;
