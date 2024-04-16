// Asm1ChatContext.tsx
import React, {createContext, useState} from 'react';
import {ChatContextType} from '../types/LocalTypes';

import {useChat} from '../hooks/apiHooks';
import {ChatMessages} from '../types/DBtypes';

const ChatContext = createContext<ChatContextType | null>(null);

const ChatProvider = ({children}: {children: React.ReactNode}) => {
  const [chatMessages, setChatMessages] = useState<ChatMessages[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);

  const {getChatMessages, addChatMessage} = useChat();

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

  const handleAddChatMessage = async (token: string, message: string) => {
    try {
      if (!chatId) {
        return [];
      }
      const messageRes = await addChatMessage(token, message, chatId);
      const updatedMessages = await getChatMessages(chatId);
      setChatMessages(updatedMessages);

      return messageRes;
    } catch (error) {
      console.error('Error adding chat message:', error);
      return null;
    }
  };

  const chatContextValue = {
    chatMessages,
    chatId,
    handleGetChatMessages,
    handleAddChatMessage,
    handleSetChatId,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
};

export {ChatProvider, ChatContext};
