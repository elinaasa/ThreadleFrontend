import {MediaResponse} from './MessageTypes';

type UserLevel = {
  level_id: number;
  level_name: 'Admin' | 'Buyer' | 'Seller' | 'Guest';
};

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  user_level_id: number;
  description: string;
  user_activity: 'Active' | 'Away' | 'Do not disturb';
  created_at: Date | string;
};

type PostItem = {
  post_id: number;
  user_id: number;
  filename: string;
  thumbnail: string;
  filesize: number;
  media_type: string;
  title: string;
  description: string | null;
  highlight: boolean;
  created_at: Date | string;
};

type CustomizeCredentials = {
  colors: string | null;
  fonts: string | null;
  user_activity?: string;
  user_level_id?: number;
  description?: string;
};

type Chats = {
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  created_at: Date | string;
};
type ChatMessages = {
  message_id: number;
  chat_id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: Date | string;
};

type Friend = {
  freindship_id: number;
  sender_id: number;
  receiver_id: number;
  created_at: Date | string;
  status: 'pending' | 'accepted' | 'declined';
};

type Theme = {
  theme_id: number;
  user_id: number;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  font1: string;
  font2: string;
  created_at: Date | string;
};

type Comment = {
  comment_id: number;
  post_id: number;
  user_id: number;
  comment_text: string;
  created_at: Date;
};
type CommentReplies = {
  reply_id: number;
  comment_id: number;
  user_id: number;
  message: string;
  created_at: Date;
};

type Save = {
  save_id: number;
  post_id: number;
  user_id: number;
  created_at: Date;
};

type Rating = {
  rating_id: number;
  post_id: number;
  user_id: number;
  rating_value: number;
  created_at: Date;
};

type Tag = {
  tag_id: number;
  tag_name: string;
};

type PostItemTag = {
  post_id: number;
  tag_id: number;
};

type TagResult = PostItemTag & Tag;

type UploadResult = {
  message: string;
  data?: {
    image: string;
  };
};
type Notification = {
  notification_id: number;
  user_id: number;
  message: string;
  viewed: boolean;
  created_at: Date | string;
};

type MostLikedMedia = Pick<
  PostItem,
  | 'post_id'
  | 'filename'
  | 'filesize'
  | 'media_type'
  | 'title'
  | 'description'
  | 'created_at'
> &
  Pick<User, 'user_id' | 'username' | 'email' | 'created_at'> & {
    likes_count: bigint;
  };

// type gymnastics to get rid of user_level_id from User type and replace it with level_name from UserLevel type
type UserWithLevel = Omit<User, 'user_level_id'> &
  Pick<UserLevel, 'level_name'>;

type UserWithNoPassword = Omit<UserWithLevel, 'password'>;

type TokenContent = Pick<User, 'user_id'> & Pick<UserLevel, 'level_name'>;

type MediaItemWithOwner = PostItem & Pick<User, 'username'>;

// for upload server
type FileInfo = {
  filename: string;
  user_id: number;
};

type NewMediaResponse = MediaResponse & {media: PostItem};

export type {
  UserLevel,
  NewMediaResponse,
  User,
  PostItem,
  Comment,
  Save,
  Rating,
  Tag,
  PostItemTag,
  TagResult,
  UploadResult,
  MostLikedMedia,
  UserWithLevel,
  UserWithNoPassword,
  Notification,
  TokenContent,
  MediaItemWithOwner,
  CustomizeCredentials,
  FileInfo,
  ChatMessages,
  Chats,
  CommentReplies,
  Theme,
  Friend,
};
