import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from "@angular/core";
import { CommentComponent } from "../../components/comment/comment.component";
import { NewCommentComponent } from "../../components/new-comment/new-comment.component";
import {
  EditCommentEvent,
  ReplyToCommentEvent,
  UpdateCommentEvent,
  type DeleteCommentEvent,
  type DeleteReplyCommentEvent,
  type UpdateCommentOrReplyEvent,
} from "../../model/comment.type";
import { CommentsStore } from "../../store/comments.store";

@Component({
    selector: "app-comments",
    templateUrl: "./comments.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommentsStore],
    imports: [CommonModule, CommentComponent, NewCommentComponent]
})
export class CommentsComponent implements OnInit {
  private commentsStore: CommentsStore = inject(CommentsStore);

  ngOnInit(): void {}

  get vm$() {
    return this.commentsStore.vm$;
  }

  onDownvote(commentId: number) {
    this.commentsStore.downvote({ id: commentId });
  }

  onUpvote(commentId: number) {
    this.commentsStore.upvote({ id: commentId });
  }

  onReplyDownvote(id: number, replyId: number) {
    this.commentsStore.downvoteReply({ id, replyId });
  }

  onReplyUpvote(id: number, replyId: number) {
    this.commentsStore.upvoteReply({ id, replyId });
  }

  onSubmitComment(comment: string) {
    this.commentsStore.submitComment(comment);
  }

  onDeleteComment(event: DeleteCommentEvent) {
    this.commentsStore.deleteComment(event);
  }

  onUpdateComment(event: UpdateCommentEvent) {
    this.commentsStore.updateComment(event);
  }

  onReplyComment(event: ReplyToCommentEvent) {
    this.commentsStore.replyComment(event);
  }

  onUpdateReplyComment(event: UpdateCommentOrReplyEvent) {
    this.commentsStore.updateReplyComment(event);
  }

  onEditComment(event: EditCommentEvent) {
    this.commentsStore.editComment(event);
  }

  onDeleteReplyComment(event: DeleteReplyCommentEvent) {
    this.commentsStore.deleteReplyComment(event);
  }
}
