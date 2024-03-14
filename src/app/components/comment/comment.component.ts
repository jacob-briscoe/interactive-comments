import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  effect,
  inject,
  input,
  runInInjectionContext,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  ReactiveFormsModule,
  type FormControl,
  type FormGroup,
} from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import {
  Comment,
  DeleteReplyCommentEvent,
  type DeleteCommentEvent,
  type EditCommentEvent,
  type ReplyComment,
  type ReplyToCommentEvent,
  type UpdateCommentOrReplyEvent,
} from '../../model/comment.type';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { BadgeComponent } from '../../shared/badge/badge.component';
import { FlatButtonDirective } from '../../shared/buttons/flat-button/flat-button.directive';
import { IconButtonDirective } from '../../shared/buttons/icon-button/icon-button.directive';
import { CommentContainerComponent } from '../../shared/comment-container/comment-container.component';
import { commentValidators } from '../../shared/helpers';
import { HighlightMentionsPipe } from '../../shared/pipes/highlight-mentions.pipe';
import { UserPicturePipe } from '../../shared/pipes/user-picture.pipe';
import { TextareaDirective } from '../../shared/textarea/textarea.directive';
import { TimestampComponent } from '../../shared/timestamp/timestamp.component';
import { UpVoteComponent } from '../../shared/up-vote/up-vote.component';
import { openDeleteCommentModal } from '../delete-comment-modal/delete-comment-modal.component';

type CommentForm = {
  comment: FormControl<string>;
};

@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UpVoteComponent,
    AvatarComponent,
    TimestampComponent,
    FlatButtonDirective,
    IconButtonDirective,
    CommentContainerComponent,
    UserPicturePipe,
    BadgeComponent,
    HighlightMentionsPipe,
    TextareaDirective,
    ReactiveFormsModule,
  ],
})
export class CommentComponent {
  @Input({ required: true }) comment!: Comment | ReplyComment;
  @Input({ transform: booleanAttribute }) myComment: boolean = false;
  isEditing = input.required<boolean>();

  @Output() edit = new EventEmitter<EditCommentEvent>();
  @Output() upVote = new EventEmitter<number>();
  @Output() downVote = new EventEmitter<number>();
  @Output() reply = new EventEmitter<ReplyToCommentEvent>();
  @Output() update = new EventEmitter<UpdateCommentOrReplyEvent>();
  @Output() delete = new EventEmitter<DeleteCommentEvent>();
  @Output() deleteReply = new EventEmitter<DeleteReplyCommentEvent>();

  @ViewChild(TextareaDirective) commentTextarea!: TextareaDirective;

  isEditingEffect = effect(() => {
    const editing = this.isEditing();
    if (editing) {
      let comment = this.comment.content;

      if ('commentId' in this.comment && !comment.length) {
        comment = `@${this.comment.replyingTo} `;
      }

      this.commentForm.setValue({ comment });

      setTimeout(() => {
        this.commentTextarea.focus();
      });
    }
  });

  private environmentInjector: EnvironmentInjector =
    inject(EnvironmentInjector);
  private dialog: Dialog = inject(Dialog);

  commentForm: FormGroup<CommentForm> = inject(FormBuilder).nonNullable.group({
    comment: ['', commentValidators],
  });

  onDownVote() {
    this.downVote.emit(this.comment.id);
  }

  onUpVote() {
    this.upVote.emit(this.comment.id);
  }

  onReply() {
    let commentId = this.comment.id;

    if ('commentId' in this.comment) {
      commentId = this.comment.commentId;
    }

    this.reply.emit({ id: commentId });
  }

  onEdit() {
    let commentId = this.comment.id;
    let replyId = undefined;

    if ('commentId' in this.comment) {
      commentId = this.comment.commentId;
      replyId = this.comment.id;
    }

    this.edit.emit({ commentId, replyId });
  }

  onDelete() {
    runInInjectionContext(this.environmentInjector, () => {
      openDeleteCommentModal(this.dialog)
        .pipe(
          takeUntilDestroyed(),
          filter((r) => !!r),
          tap(() =>
            'commentId' in this.comment
              ? this.deleteReply.emit({
                  commentId: this.comment.commentId,
                  replyId: this.comment.id,
                })
              : this.delete.emit(this.comment.id),
          ),
        )
        .subscribe();
    });
  }

  onUpdate() {
    const { comment } = this.commentForm.getRawValue();

    let event: UpdateCommentOrReplyEvent = {
      content: comment,
      id: this.comment.id,
      commentId:
        'commentId' in this.comment ? this.comment.commentId : undefined,
    };

    this.update.emit(event);
  }

  get userName() {
    return this.comment.user.username;
  }

  get createdAt() {
    return this.comment.createdAt;
  }

  get commentText() {
    return this.comment.content;
  }

  get voteCount() {
    return this.comment.score;
  }

  get user() {
    return this.comment.user;
  }
}
