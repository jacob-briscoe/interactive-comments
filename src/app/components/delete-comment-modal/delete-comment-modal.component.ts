import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FlatButtonDirective } from '../../shared/buttons/flat-button/flat-button.directive';

@Component({
  selector: 'app-delete-comment-modal',
  standalone: true,
  imports: [FlatButtonDirective],
  templateUrl: './delete-comment-modal.component.html',
  styles: `
     :host {
      display: block;
      background: #fff;
      border-radius: 8px;
      padding: 16px;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        display: block;
        background: rgb(168 178 194);
        border-radius: 8px;
        padding: 16px;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCommentModalComponent {
  dialogRef: DialogRef<boolean, DeleteCommentModalComponent> = inject(
    DialogRef<boolean, DeleteCommentModalComponent>,
  );

  cancel() {
    this.dialogRef.close(false);
  }

  proceed() {
    this.dialogRef.close(true);
  }
}

export function openDeleteCommentModal(dialog: Dialog) {
  const dialogRef = dialog.open<boolean>(DeleteCommentModalComponent, {
    width: '350px',
  });

  return dialogRef.closed;
}
