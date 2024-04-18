import {ChatMessages, User, UserWithNoPassword} from './DBtypes';
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
  handleAddChatMessage: (
    token: string,
    sender_id: number,
    receiver_id: number,
    message: string,
  ) => void;
};
