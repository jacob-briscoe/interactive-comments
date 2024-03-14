import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appTextarea]',
  standalone: true,
})
export class TextareaDirective implements OnInit {
  private element: ElementRef<HTMLTextAreaElement> = inject(
    ElementRef<HTMLTextAreaElement>,
  );

  ngOnInit(): void {
    const { classList } = this.element.nativeElement;

    classList.add(
      'box-border',
      'dark:bg-dark-blue',
      'dark:ring-grayish-blue',
      'focus:ring-moderate-blue',
      'hover:cursor-pointer',
      'hover:ring-moderate-blue',
      'outline-none',
      'pt-3',
      'px-5',
      'resize-none',
      'ring-1',
      'ring-light-gray',
      'rounded-md',
      'w-full',
    );
  }

  focus() {
    this.element.nativeElement.focus();
  }
}
