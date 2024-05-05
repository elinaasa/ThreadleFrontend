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
    console.log('data', token, user, otherUser, inputs.message);
    if (!token || !user || !otherUser || !inputs.message) {
      return;
    }
    handleAddChatMessage(
      token,
      user.user_id,
      otherUser.user_id,
      inputs.message,
    );
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
    // If there are no chat messages or chatId, navigate back to chats
    if (chatMessages.length < 0 || !chatId) {
      navigate('/Chats');
    }
    handleGetChatMessages();
  }, []);

  const getOtherUserObj = async (chat: ChatMessages) => {
    // If there is no user or chat, return
    if (!user || !chat) return;
    // Get the other user id and set it to state
    const otherUser =
      chat?.receiver_id === user?.user_id ? chat?.sender_id : chat?.receiver_id;

    const otherUserObject = await getUserById(otherUser);
    setOtherUser(otherUserObject);
  };

  useEffect(() => {
    // at start of component, get the other user object based of first message
    if (!otherUser) {
      getOtherUserObj(chatMessages[0]);
    }
  }, [chatMessages[0]]);
  return (
    <main style={{maxWidth: '1300px'}} className="p-header">
      <div className="container">
        <div className="chat-title">
          <h2>Chat from post {}</h2>
          <button
            className="back-button"
            onClick={() => {
              navigate('/Chats');
            }}
          >
            <img src={'../keyboard-enter-return.svg'} alt="search" />
            go back
          </button>
        </div>
        <ul className="chat-list">
          {chatMessages &&
            chatMessages.length > 0 &&
            chatMessages.map((chat, index) => (
              <li
                key={index}
                className={`message ${chat.sender_id === user?.user_id ? 'message-sent' : 'message-received'}`}
              >
                <div
                  className={`message-content ${chat.sender_id === user?.user_id && 'message-sent'}`}
                >
                  <div className="avatar">
                    {chat.sender_id === user?.user_id ? (
                      <img
                        className="chat-pfp"
                        src={user?.pfp_url || '../artist.png'}
                        alt="artist"
                      />
                    ) : (
                      <img
                        className="chat-pfp"
                        src={otherUser?.pfp_url || '../artist.png'}
                        alt="artist"
                      />
                    )}
                  </div>
                  <div className="message-details">
                    <p className="sender-name">
                      {chat.sender_id === user?.user_id
                        ? `You`
                        : otherUser?.username}
                    </p>
                    <p className="message-text">{chat.message}</p>
                  </div>
                </div>
              </li>
            ))}
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
