import { Dialog, DialogModule } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { CommentComponent } from '../../../components/comment/comment.component';
import {
  DeleteCommentModalComponent,
  openDeleteCommentModal,
} from '../../../components/delete-comment-modal/delete-comment-modal.component';
import { NewCommentComponent } from '../../../components/new-comment/new-comment.component';
import type { Comment } from '../../../model/comment.type';
import type { User } from '../../../model/user.type';
import { AvatarComponent } from '../../../shared/avatar/avatar.component';
import { BadgeComponent } from '../../../shared/badge/badge.component';
import { BasicButtonDirective } from '../../../shared/buttons/basic-button/basic-button.directive';
import { FlatButtonDirective } from '../../../shared/buttons/flat-button/flat-button.directive';
import { IconButtonDirective } from '../../../shared/buttons/icon-button/icon-button.directive';
import { SVGIconComponent } from '../../../shared/icon/icon.component';
import { TextareaDirective } from '../../../shared/textarea/textarea.directive';
import { TimestampComponent } from '../../../shared/timestamp/timestamp.component';
import { UpVoteComponent } from '../../../shared/up-vote/up-vote.component';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  templateUrl: './sandbox.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    UpVoteComponent,
    FlatButtonDirective,
    BasicButtonDirective,
    SVGIconComponent,
    IconButtonDirective,
    AvatarComponent,
    BadgeComponent,
    TimestampComponent,
    ReactiveFormsModule,
    TextareaDirective,
    DeleteCommentModalComponent,
    DialogModule,
    CommentComponent,
    NewCommentComponent,
  ],
})
export class SandboxComponent {
  voteCount: number = 0;
  commentsForm = new FormGroup({
    comment1: new FormControl('This is my comment before I started editing.'),
    comment2: new FormControl(''),
  });
  comment: Comment;
  user: User;
  private dialog: Dialog = inject(Dialog);
  private environmentInjector: EnvironmentInjector =
    inject(EnvironmentInjector);
  timestamp1: number = Date.now();
  timestamp2: number = new Date().setMinutes(new Date().getMinutes() - 6);

  constructor() {
    this.user = {
      image: {
        png: './images/avatars/image-amyrobson.png',
        webp: './images/avatars/image-amyrobson.webp',
      },
      username: 'amyrobson',
    };

    this.comment = {
      id: 1,
      content:
        'Impressive @maxblagun! Though it seems the drag feature could be improved. But overall it looks incredible. @ramsesmiron nailed the design and the responsiveness at various breakpoints works really well.',
      createdAt: Date.now(),
      score: 12,
      replies: [],
      user: this.user,
    };
  }

  handleUpvote() {
    this.voteCount++;
  }

  handleDownvote() {
    this.voteCount--;
  }

  handleOpenDeleteCommentModal() {
    runInInjectionContext(this.environmentInjector, () => {
      openDeleteCommentModal(this.dialog)
        .pipe(
          takeUntilDestroyed(),
          tap((result) =>
            console.log('closed dialog - delete comment?', result),
          ),
        )
        .subscribe();
    });
  }
}
