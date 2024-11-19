import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  type FormGroup,
} from '@angular/forms';
import type { User } from '../../model/user.type';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { FlatButtonDirective } from '../../shared/buttons/flat-button/flat-button.directive';
import { CommentContainerComponent } from '../../shared/comment-container/comment-container.component';
import { commentValidators } from '../../shared/helpers';
import { UserPicturePipe } from '../../shared/pipes/user-picture.pipe';
import { TextareaDirective } from '../../shared/textarea/textarea.directive';

type NewCommentForm = {
  comment: FormControl<string>;
};

@Component({
    selector: 'app-new-comment',
    templateUrl: './new-comment.component.html',
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommentContainerComponent,
        AvatarComponent,
        FlatButtonDirective,
        TextareaDirective,
        UserPicturePipe,
        ReactiveFormsModule,
    ]
})
export class NewCommentComponent {
  @Input({ required: true }) user!: User;
  @Input({ transform: booleanAttribute }) isReply: boolean = false;
  @Output() submitComment = new EventEmitter<string>();

  formGroup: FormGroup<NewCommentForm> = inject(FormBuilder).nonNullable.group({
    comment: ['', commentValidators],
  });

  onSubmit() {
    this.submitComment.emit(this.formGroup.value.comment);
    this.formGroup.reset();
  }
}
