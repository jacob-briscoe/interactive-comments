import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommentContainerComponent } from '../../shared/comment-container/comment-container.component';

@Component({
  selector: 'app-comment-loading-placeholder',
  standalone: true,
  templateUrl: './comment-loading-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommentContainerComponent],
})
export class CommentLoadingPlaceholderComponent {}
