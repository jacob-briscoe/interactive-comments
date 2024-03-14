import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-comment-container',
  standalone: true,
  imports: [],
  template: `
    <div class="w-full sm:max-w-3xl rounded-md bg-white dark:bg-dark-blue p-5">
      <ng-content />
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentContainerComponent {}
