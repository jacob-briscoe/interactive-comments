import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconButtonDirective } from '../buttons/icon-button/icon-button.directive';

@Component({
  selector: 'app-up-vote',
  standalone: true,
  templateUrl: './up-vote.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconButtonDirective],
})
export class UpVoteComponent {
  @Input() voteCount: number = 0;
  @Output() upVote = new EventEmitter<void>();
  @Output() downVote = new EventEmitter<void>();

  onUpvote() {
    this.upVote.emit();
  }

  onDownVote() {
    this.downVote.emit();
  }

  get canUpVote() {
    return this.voteCount >= 0 && this.voteCount < 99;
  }

  get canDownVote() {
    return this.voteCount > 0;
  }
}
