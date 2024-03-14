import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
} from '@angular/core';
import { Icon, Icons, ProvidedIcon } from '../../model/icon.type';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SVGIconComponent {
  @Input() icon: Icon = Icons.None;
  isMouseHovering: boolean = false;

  iconColors: Record<ProvidedIcon, { default: string; hover?: string }> = {
    delete: { default: '#ED6368' },
    edit: { default: '#5357B6' },
    minus: { default: '#C5C6EF', hover: '#5357B6' },
    plus: { default: '#C5C6EF', hover: '#5357B6' },
    reply: { default: '#5357B6' },
  };

  get fillColor() {
    if (Icons.None === this.icon) {
      return '#000000';
    }

    const colors = this.iconColors[this.icon];
    return this.isMouseHovering && colors.hover ? colors.hover : colors.default;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.isMouseHovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.isMouseHovering = false;
  }
}
