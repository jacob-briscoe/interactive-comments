import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  finalize,
  map,
  switchMap,
  tap,
  type Observable,
} from 'rxjs';
import type { CommentsApi } from '../model/api/comment.type';
import type {
  Comment,
  CommentsOrder,
  DeleteCommentEvent,
  DeleteReplyCommentEvent,
  EditCommentEvent,
  RepliesOrder,
  ReplyComment,
  ReplyToCommentEvent,
  UpdateCommentEvent,
  UpdateCommentOrReplyEvent,
  UpvoteOrDownvoteCommentEvent,
  UpvoteOrDownvoteReplyEvent,
  VoteDirection,
} from '../model/comment.type';
import type { User } from '../model/user.type';
import { CommentsApiService } from '../services/comments-api.service';
import { UserStore } from './user.store';

const initialStateValue: State = {
  comments: {},
  commentsOrder: [],
  replies: {},
  repliesOrder: {},
  loadingComments: false,
  editing: {
    isEditing: false,
  },
};

type Editing = {
  isEditing: boolean;
  commentId?: Comment['id'];
  replyId?: ReplyComment['id'];
};

export type ViewModel = {
  comments: Comment[];
  user: User;
  loadingComments: boolean;
  editing: Editing;
};

type State = {
  comments: CommentsState;
  commentsOrder: CommentsOrder;
  replies: RepliesState;
  repliesOrder: RepliesOrder;
  loadingComments: boolean;
  editing: Editing;
};

type CommentsState = {
  [key: Comment['id']]: CommentVM;
};

type CommentVM = Omit<Comment, 'id' | 'replies'>;

type RepliesState = {
  [key: Comment['id']]: ReplyCommentState;
};

type ReplyCommentState = {
  [key: ReplyComment['id']]: ReplyVM;
};

type ReplyVM = Omit<ReplyComment, 'id'>;

@Injectable()
export class CommentsStore {
  private userStore: UserStore = inject(UserStore);
  private commentsService: CommentsApiService = inject(CommentsApiService);

  private state = new BehaviorSubject<State>(initialStateValue);
  private state$: Observable<State> = this.state.asObservable();

  vm$: Observable<ViewModel>;

  constructor() {
    this.userStore.user$
      .pipe(
        filter((user) => !!user),
        tap(() => this.setLoadingComments(true)),
        switchMap((user) =>
          this.commentsService.getComments(user!).pipe(
            map(({ comments }) => this.transformAPICommentsToState(comments)),
            tap((state) => {
              this.state.next({ ...this.state.getValue(), ...state });
            }),
            finalize(() => this.setLoadingComments(false)),
          ),
        ),
      )
      .subscribe();

    this.vm$ = combineLatest([this.state$, this.userStore.user$]).pipe(
      map(([state, user]) => ({
        comments: this.sortedComments(state),
        user: user!,
        loadingComments: state.loadingComments,
        editing: state.editing,
      })),
    );
  }

  private setLoadingComments(loading: boolean) {
    this.state.next({ ...this.state.getValue(), loadingComments: loading });
  }

  upvote(event: UpvoteOrDownvoteCommentEvent) {
    this.performUpvoteOrDownvote('up', event);
  }

  downvote(event: UpvoteOrDownvoteCommentEvent) {
    this.performUpvoteOrDownvote('down', event);
  }

  upvoteReply(event: UpvoteOrDownvoteReplyEvent) {
    this.performUpvoteOrDownvoteReply('up', event);
  }

  downvoteReply(event: UpvoteOrDownvoteReplyEvent) {
    this.performUpvoteOrDownvoteReply('down', event);
  }

  submitComment(comment: string) {
    const updatingState = this.state.getValue();
    updatingState.comments[Date.now()] = {
      content: comment,
      createdAt: Date.now(),
      score: 0,
      user: this.userStore.loggedInUser,
    };
    updatingState.commentsOrder = this.getCommentsOrder(updatingState.comments);
    this.state.next(updatingState);
  }

  deleteComment(commentId: DeleteCommentEvent) {
    const updatingState = this.state.getValue();
    delete updatingState.comments[commentId];
    updatingState.commentsOrder = this.getCommentsOrder(updatingState.comments);
    this.state.next(updatingState);
  }

  updateComment({ id, content }: UpdateCommentEvent) {
    const updatingState = this.state.getValue();
    updatingState.comments[id].content = content;
    updatingState.editing = {
      isEditing: false,
    };
    this.state.next(updatingState);
  }

  replyComment({ id }: ReplyToCommentEvent) {
    const updatingState = this.state.getValue();

    const replyId = Date.now();

    updatingState.replies[id] = {
      ...updatingState.replies[id],
      [replyId]: {
        commentId: id,
        content: '',
        createdAt: Date.now(),
        user: this.userStore.loggedInUser,
        score: 0,
        replyingTo: updatingState.comments[id].user.username,
      },
    };

    updatingState.repliesOrder = this.getRepliesOrder(updatingState.replies);

    updatingState.editing = { isEditing: true, commentId: id, replyId };

    this.state.next(updatingState);
  }

  updateReplyComment(event: UpdateCommentOrReplyEvent) {
    if ('commentId' in event) {
      const updatingState = this.state.getValue();
      updatingState.replies[event.commentId][event.id].content = event.content;
      updatingState.editing = {
        isEditing: false,
      };
      this.state.next(updatingState);
    } else {
      this.updateComment(event);
    }
  }

  editComment(event: EditCommentEvent) {
    const updatingState = this.state.getValue();
    updatingState.editing = {
      isEditing: true,
      commentId: event.commentId,
      replyId: event.replyId,
    };
    this.state.next(updatingState);
  }

  deleteReplyComment(event: DeleteReplyCommentEvent) {
    const updatingState = this.state.getValue();
    delete updatingState.replies[event.commentId][event.replyId];
    updatingState.repliesOrder[event.commentId] = updatingState.repliesOrder[
      event.commentId
    ].filter((replyId) => replyId !== event.replyId);
    this.state.next(updatingState);
  }

  private performUpvoteOrDownvote(
    direction: VoteDirection,
    { id }: UpvoteOrDownvoteCommentEvent,
  ) {
    const updatingState = this.state.getValue();
    const comment = updatingState.comments[id];
    comment.score = this.vote(direction, comment.score);
    updatingState.commentsOrder = this.getCommentsOrder(updatingState.comments);
    this.state.next(updatingState);
  }

  private performUpvoteOrDownvoteReply(
    direction: VoteDirection,
    { id, replyId }: UpvoteOrDownvoteReplyEvent,
  ) {
    const updatingState = this.state.getValue();
    const reply = updatingState.replies[id][replyId];
    reply.score = this.vote(direction, reply.score);
    this.state.next(updatingState);
  }

  private vote(direction: VoteDirection, current: number): number {
    return current + (direction === 'up' ? 1 : -1);
  }

  private transformAPICommentsToState(
    commentsApi: CommentsApi,
  ): Partial<State> {
    const comments = this.transformAPIComments(commentsApi);
    const replies = this.transformAPIReplies(commentsApi);

    return {
      comments,
      commentsOrder: this.getCommentsOrder(comments),
      replies,
      repliesOrder: this.getRepliesOrder(replies),
    };
  }

  private transformAPIComments(comments: CommentsApi) {
    return comments.reduce<CommentsState>(
      (prev, curr) => ({ ...prev, [curr.id]: { ...curr } }),
      {},
    );
  }

  private transformAPIReplies(comments: CommentsApi) {
    return Object.entries(comments).reduce<RepliesState>(
      (prevState, [commentId, comment]) => ({
        ...prevState,
        [+commentId]: comment.replies.reduce<ReplyCommentState>(
          (prevReply, { id: replyId, ...restOfReply }) => ({
            ...prevReply,
            [replyId]: { ...restOfReply, commentId: +commentId },
          }),
          {},
        ),
      }),
      {},
    );
  }

  private getCommentsOrder(comments: CommentsState): CommentsOrder {
    return Object.entries(comments)
      .sort(([, { score: aScore }], [, { score: bScore }]) => bScore - aScore)
      .map(([commentId]) => +commentId);
  }

  private getRepliesOrder(repliesState: RepliesState) {
    return Object.entries(repliesState).reduce<RepliesOrder>(
      (prev, [commentId, repliesCommentState]) => {
        return {
          ...prev,
          [commentId]: Object.entries(repliesCommentState)
            .sort(
              ([, { createdAt: aCreatedAt }], [, { createdAt: bCreatedAt }]) =>
                aCreatedAt - bCreatedAt,
            )
            .map(([replyId]) => +replyId),
        };
      },
      {},
    );
  }

  private sortedComments({
    comments,
    commentsOrder,
    replies,
    repliesOrder,
  }: State): Comment[] {
    return commentsOrder.map((commentId) => ({
      id: commentId,
      ...comments[commentId],
      replies: repliesOrder[commentId]
        ? repliesOrder[commentId].map((replyId) => ({
            ...replies[commentId][replyId],
            id: replyId,
            commentId: commentId,
          }))
        : [],
    }));
  }
}
