import { Pipe, PipeTransform } from '@angular/core';
import type { User } from '../../model/user.type';

@Pipe({
  name: 'userPicture',
  standalone: true,
})
export class UserPicturePipe implements PipeTransform {
  transform({ image }: User): string {
    return `assets/${image.webp}`;
  }
}
