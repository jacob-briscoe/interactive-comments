import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getColor } from '../../helpers/color.helper';
import { ThemeColor } from '../../model/theme.type';

@Component({
    selector: 'app-badge',
    imports: [],
    template: `
    <label
      [class]="[
        backgroundColor,
        'py-0.5',
        'px-2',
        'rounded-sm',
        'dark:text-slate-300',
        'text-slate-200',
        'lowercase'
      ]"
      ><ng-content
    /></label>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() color: ThemeColor = 'primary';

  get backgroundColor() {
    return `bg-${getColor(this.color)}`;
  }
}
