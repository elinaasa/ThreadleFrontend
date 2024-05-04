// Asm1ChatContext.tsx
import React, {createContext, useState} from 'react';
import {ChatContextType} from '../types/LocalTypes';

import {useChat} from '../hooks/apiHooks';
import {ChatMessages} from '../types/DBtypes';

const ChatContext = createContext<ChatContextType | null>(null);

const ChatProvider = ({children}: {children: React.ReactNode}) => {
  const [chatMessages, setChatMessages] = useState<ChatMessages[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);

  const {getChatMessages, addChatMessage, createChatConversation} = useChat();

  const handleGetChatMessages = async () => {
    try {
      if (!chatId) {
        return [];
      }
      const messages = await getChatMessages(chatId);
      setChatMessages(messages);
      return messages;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      return [];
    }
  };

  const handleSetChatId = (id: number) => setChatId(id);

  const handleAddChatMessage = async (
    token: string,
    sender_id: number,
    receiver_id: number,
    message: string,
  ) => {
    try {
      if (!chatId) {
        return [];
      }
      const messageRes = await addChatMessage(
        token,
        sender_id,
        receiver_id,
        message,
        chatId,
      );
      const updatedMessages = await getChatMessages(chatId);
      setChatMessages(updatedMessages);

      return messageRes;
    } catch (error) {
      console.error('Error adding chat message:', error);
      return null;
    }
  };

  const handleCreateChatConversation = async (
    token: string,
    receiver_id: number,
    post_id: number | null,
  ) => {
    try {
      const chatRes = await createChatConversation(token, receiver_id, post_id);
      if (chatRes && 'chat_id' in chatRes) {
        handleSetChatId(chatRes.chat_id);
        handleGetChatMessages();
        return chatRes;
      } else {
        console.log(chatRes.message);
        return chatRes;
      }
    } catch (error) {
      console.error('Error creating chat conversation:', error);
      return null;
    }
  };

  const chatContextValue = {
    chatMessages,
    chatId,
    handleGetChatMessages,
    handleAddChatMessage,
    handleSetChatId,
    handleCreateChatConversation,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export {ChatProvider, ChatContext};
