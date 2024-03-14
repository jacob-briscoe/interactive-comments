import { UserApi } from './user.type';

export type CommentApi = {
  id: number;
  content: string;
  createdAt: number;
  score: number;
  user: UserApi;
  replies: RepliesApi;
};

export type CommentsApi = CommentApi[];

export type ReplyApi = Omit<CommentApi, 'replies'> & {
  replyingTo: string;
};

export type RepliesApi = ReplyApi[];
