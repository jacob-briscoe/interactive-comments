import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { getColor } from '../../../helpers/color.helper';
import { ThemeColor } from '../../../model/theme.type';

@Directive({
  selector: '[appFlatButton]',
  standalone: true,
})
export class FlatButtonDirective implements OnInit {
  @Input() color: ThemeColor = 'primary';

  private element: ElementRef<HTMLButtonElement> = inject(
    ElementRef<HTMLButtonElement>,
  );

  ngOnInit(): void {
    this.setClasses(this.element.nativeElement);
  }

  private setClasses(nativeElement: HTMLButtonElement) {
    const { classList } = nativeElement;

    const baseClasses = [
      'dark:text-slate-300',
      'disabled:opacity-50',
      'font-medium',
      'hover:opacity-50',
      'px-8',
      'py-3',
      'rounded-lg',
      'text-slate-200',
      'text-sm',
      'uppercase',
      'w-fit',
    ];

    const actualThemeColor = getColor(this.color);
    const backgroundColor = `bg-${actualThemeColor}`;

    classList.add(...baseClasses, backgroundColor);
  }
}
