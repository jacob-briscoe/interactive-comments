import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { getColor } from '../../../helpers/color.helper';
import { ThemeColor } from '../../../model/theme.type';

@Directive({
  selector: '[appBasicButton]',
  standalone: true,
})
export class BasicButtonDirective implements OnInit {
  @Input() color: ThemeColor = 'primary';

  private element: ElementRef<HTMLButtonElement> = inject(
    ElementRef<HTMLButtonElement>,
  );

  ngOnInit(): void {
    const { classList } = this.element.nativeElement;

    const baseClasses = ['capitalize', 'hover:opacity-50'];

    const actualThemeColor = getColor(this.color);
    const textColor = `text-${actualThemeColor}`;

    classList.add(...baseClasses, textColor);
  }
}
