import { CommentsApi } from './comment.type';
import { UserApi } from './user.type';

export type GetCommentsApiRequest = {
  user: UserApi;
};

export type GetCommentsApiResponse = {
  currentUser: UserApi;
  comments: CommentsApi;
};
