// ContextHooks.ts
import {useContext} from 'react';
import {UserContext} from '../contexts/UserContext';
import {ChatContext} from '../contexts/ChatContext';

// Current recommendation is to use custom hook instead of the context directly
// this way we don't have errors when UserContext is not defined or null (thats why we have the if statement)

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return context;
};
const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within an ChatProvider');
  }

  return context;
};

export {useUserContext, useChatContext};
