import { CommentApi, type ReplyApi } from './api/comment.type';

export type Comment = CommentApi & {
  replies: ReplyComment[];
};

export type ReplyComment = ReplyApi & {
  commentId: Comment['id'];
};

export type ReplyToCommentEvent = Pick<Comment, 'id'>;

export type UpdateCommentEvent = Pick<Comment, 'id' | 'content'>;

export type UpdateReplyCommentEvent = Pick<ReplyComment, 'id' | 'content'> & {
  commentId: Comment['id'];
};

export type UpdateCommentOrReplyEvent =
  | UpdateCommentEvent
  | UpdateReplyCommentEvent;

export type UpvoteOrDownvoteCommentEvent = Pick<Comment, 'id'>;

export type UpvoteOrDownvoteReplyEvent = Pick<Comment, 'id'> & {
  replyId: ReplyComment['id'];
};

export type DeleteCommentEvent = Comment['id'];

export type CommentsOrder = Comment['id'][];

export type RepliesOrder = {
  [commentId: Comment['id']]: ReplyComment['id'][];
};

export type VoteDirection = 'up' | 'down';

export type EditCommentEvent = {
  commentId: Comment['id'];
  replyId?: ReplyComment['id'];
};

export type DeleteReplyCommentEvent = {
  commentId: Comment['id'];
  replyId: ReplyComment['id'];
};
