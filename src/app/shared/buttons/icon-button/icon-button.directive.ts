import {
  Directive,
  ElementRef,
  EnvironmentInjector,
  Input,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Icon, Icons } from '../../../model/icon.type';
import { SVGIconComponent } from '../../icon/icon.component';
import { BasicButtonDirective } from '../basic-button/basic-button.directive';

@Directive({
  selector: '[appIconButton]',
  standalone: true,
  hostDirectives: [
    {
      directive: BasicButtonDirective,
      inputs: ['color'],
    },
  ],
})
export class IconButtonDirective implements OnInit {
  @Input() icon: Icon = Icons.None;

  private element: ElementRef<HTMLButtonElement> = inject(
    ElementRef<HTMLButtonElement>,
  );
  private viewContainer: ViewContainerRef = inject(ViewContainerRef);
  private environmentInjector: EnvironmentInjector =
    inject(EnvironmentInjector);

  ngOnInit(): void {
    const { nativeElement } = this.element;

    const iconComponent = this.viewContainer.createComponent(SVGIconComponent, {
      environmentInjector: this.environmentInjector,
    });
    iconComponent.setInput('icon', this.icon);
    nativeElement.prepend(iconComponent.location.nativeElement);

    nativeElement.classList.add('flex', 'flex-row', 'items-center', 'gap-2');
  }
}
