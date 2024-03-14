import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightMentions',
  standalone: true,
})
export class HighlightMentionsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value.replace(
      /@([^\s^!\.\?,]+)/g,
      '<span class="text-moderate-blue font-medium">@$1</span>',
    );
  }
}
