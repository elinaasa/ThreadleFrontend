import {User, UserWithNoPassword} from './DBtypes';
export type Credentials = Pick<User, 'username' | 'password'>;

export type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};
