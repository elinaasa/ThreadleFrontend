import {useEffect, useState} from 'react';
import {
  PostItem,
  MediaItemWithOwner,
  User,
  UserWithNoPassword,
  ChatMessages,
  Notification,
  TagResult,
  NewMediaResponse,
} from '../types/DBtypes';
import {fetchData} from '../lib/functions';
import {Credentials} from '../types/LocalTypes';
import {
  ChatResponse,
  LoginResponse,
  MessageResponse,
  UploadResponse,
  UserResponse,
} from '../types/MessageTypes';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  const getMedia = async () => {
    try {
      const mediaItems = await fetchData<PostItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media',
      );
      // Get usernames (file owners) for all media files from auth api
      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(
        mediaItems.map(async (item) => {
          const owner = await fetchData<User>(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          const itemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return itemWithOwner;
        }),
      );
      setMediaArray(itemsWithOwner);
      console.log('mediaArray updated:', itemsWithOwner);
      return itemsWithOwner;
    } catch (error) {
      console.error('getMedia failed', error);
      return null;
    }
  };
  const getMyMedia = async (user_id: number) => {
    try {
      const postItems = await fetchData<PostItem[]>(
        import.meta.env.VITE_MEDIA_API + '/media/all/' + user_id,
      );
      // Get usernames (file owners) for all media files from auth api
      const itemsWithOwner: MediaItemWithOwner[] = await Promise.all(
        postItems.map(async (item) => {
          const owner = await fetchData<User>(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          const itemWithOwner: MediaItemWithOwner = {
            ...item,
            username: owner.username,
          };
          return itemWithOwner;
        }),
      );
      setMediaArray(itemsWithOwner);
      console.log('mediaArray updated:', itemsWithOwner);
      return itemsWithOwner;
    } catch (error) {
      console.error('getMedia failed', error);
      return null;
    }
  };
  const getHighlightById = async (id: number) => {
    try {
      const postItem = await fetchData<PostItem>(
        import.meta.env.VITE_MEDIA_API + '/media/highlight/' + id,
      );
      console.log('postItems', postItem);
      // Get usernames (file owners) for all media files from auth api
      const owner = await fetchData<User>(
        import.meta.env.VITE_AUTH_API + '/users/' + postItem.user_id,
      );
      const itemWithOwner: MediaItemWithOwner = {
        created_at: postItem.created_at,
        description: postItem.description,
        filename: postItem.filename,
        filesize: postItem.filesize,
        media_type: postItem.media_type,
        post_id: postItem.post_id,
        thumbnail: postItem.thumbnail,
        title: postItem.title,
        user_id: postItem.user_id,
        username: owner.username,
      };
      return itemWithOwner;
    } catch (error) {
      console.error('getHighlightById failed', error);
      return null;
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string,
  ) => {
    // TODO: create a suitable object for Media API,
    // the type is MediaItem without media_id, user_id,
    // thumbnail and created_at. All those are generated by the API.
    const media: Omit<
      PostItem,
      'post_id' | 'user_id' | 'thumbnail' | 'created_at'
    > = {
      title: inputs.title,
      description: inputs.description,
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
    };

    // TODO: post the data to Media API and get the data as MediaResponse
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    };
    return fetchData<NewMediaResponse>(
      import.meta.env.VITE_MEDIA_API + '/media',
      options,
    );
  };

  const getMediaById = async (id: number) => {
    const mediaItem = await fetchData<PostItem>(
      import.meta.env.VITE_MEDIA_API + '/media/' + id,
    );
    // Get usernames (file owners) for all media files from auth api
    const owner = await fetchData<UserWithNoPassword>(
      import.meta.env.VITE_AUTH_API + '/users/' + mediaItem.user_id,
    );
    const itemWithOwner: MediaItemWithOwner = {
      created_at: mediaItem.created_at,
      thumbnail: mediaItem.thumbnail,
      description: mediaItem.description,
      filename: mediaItem.filename,
      filesize: mediaItem.filesize,
      media_type: mediaItem.media_type,
      post_id: mediaItem.post_id,
      title: mediaItem.title,
      user_id: mediaItem.user_id,
      username: owner.username,
    };
    return itemWithOwner;
  };

  return {
    mediaArray,
    getHighlightById,
    getMyMedia,
    getMedia,
    postMedia,
    getMediaById,
  };
};

const useUser = () => {
  // TODO: implement network functions for auth server user endpoints
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token/',
      options,
    );
  };
  const getUserById = async (id: number) => {
    return await fetchData<UserWithNoPassword>(
      import.meta.env.VITE_AUTH_API + '/users/' + id,
    );
  };

  const postUser = async (user: Record<string, string>) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users',
      options,
    );
  };

  const getUsernameAvailable = async (username: string) => {
    return await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username,
    );
  };

  const getEmailAvailable = async (email: string) => {
    return await fetchData<{available: boolean}>(
      import.meta.env.VITE_AUTH_API + '/users/email/' + email,
    );
  };

  return {
    getUserByToken,
    getUserById,
    postUser,
    getUsernameAvailable,
    getEmailAvailable,
  };
};

const useAuthentication = () => {
  const postLogin = async (creds: Credentials) => {
    return await fetchData<LoginResponse>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  return {postLogin};
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append('file', file);
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      options,
    );
  };

  return {postFile};
};

const useChat = () => {
  // const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Chat conversations
  const getChatConversations = async (token: string) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const chats = await fetchData<ChatResponse[]>(
      import.meta.env.VITE_MEDIA_API + '/chat',
      options,
    );
    // setChatMessages(messages);
    return chats;
  };

  // Messages
  const getChatMessages = async (id: number) => {
    const messages = await fetchData<ChatMessages[]>(
      import.meta.env.VITE_MEDIA_API + '/chat/message/' + id,
    );
    // setChatMessages(messages);
    return messages;
  };

  const addChatMessage = async (token: string, message: string, id: number) => {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({message}),
    };
    const messageRes = await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + '/chat/message/' + id,
      options,
    );
    return messageRes;
  };

  return {
    getChatMessages,
    addChatMessage,
    getChatConversations,
  };
};

const useNotifications = () => {
  const getNotifications = async (token: string) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const notifications = await fetchData<Notification[]>(
      import.meta.env.VITE_MEDIA_API + '/notifications',
      options,
    );
    return notifications;
  };

  const markNotificationAsRead = async (token: string, id: number) => {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    await fetchData<Notification>(
      import.meta.env.VITE_MEDIA_API + '/notifications/' + id,
      options,
    );
  };

  return {getNotifications, markNotificationAsRead};
};

const useTags = () => {
  const getTags = async () => {
    return await fetchData<TagResult[]>(
      import.meta.env.VITE_MEDIA_API + '/tags',
    );
  };
  const getMediaByTag = async (tag: string) => {
    return await fetchData<PostItem[]>(
      import.meta.env.VITE_MEDIA_API + '/tags/' + tag,
    );
  };
  const getTagsByPostId = async (id: number) => {
    return await fetchData<TagResult[]>(
      import.meta.env.VITE_MEDIA_API + '/tags/media/' + id,
    );
  };
  const postTag = async (post_id: number, tag_name: string, token: string) => {
    console.log('postTag', post_id, tag_name, token);

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({tag_name, post_id}),
    };
    return await fetchData<MessageResponse[]>(
      import.meta.env.VITE_MEDIA_API + '/tags',
      options,
    );
  };
  return {getTags, getMediaByTag, getTagsByPostId, postTag};
};

export {
  useMedia,
  useChat,
  useUser,
  useAuthentication,
  useFile,
  useNotifications,
  useTags,
};
