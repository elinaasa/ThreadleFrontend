import {ChatMessages, User, UserWithNoPassword} from './DBtypes';
import {ChatResponse, MessageResponse} from './MessageTypes';
export type Credentials = Pick<User, 'username' | 'password'>;

export type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

export type ChatContextType = {
  chatMessages: ChatMessages[];
  chatId: number | null;
  handleSetChatId: (id: number) => void;
  handleGetChatMessages: () => void;
  handleCreateChatConversation: (
    token: string,
    receiver_id: number,
    post_id: number | null,
  ) => Promise<MessageResponse | ChatResponse | null>;
  handleAddChatMessage: (
    token: string,
    sender_id: number,
    receiver_id: number,
    message: string,
  ) => void;
};
