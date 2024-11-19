import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  type Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';
import { calculateElapsedTime } from '../helpers';

@Component({
    selector: 'app-timestamp',
    imports: [CommonModule],
    template: `<time
    [title]="createdAt() | date: 'medium'"
    [dateTime]="createdAt() | date: 'full'"
    class="text-grayish-blue"
    >{{ $elapsedTime() }}</time
  >`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimestampComponent {
  createdAt = input.required<number>();

  $elapsedTime: Signal<string | undefined> = computed(() => {
    const createdAtTime = this.createdAt();
    const updateTime = this.$updater();
    return updateTime ?? calculateElapsedTime(createdAtTime);
  });

  $updater: Signal<string | undefined> = toSignal(
    interval(60_000).pipe(map(() => calculateElapsedTime(this.createdAt()))),
  );
}
