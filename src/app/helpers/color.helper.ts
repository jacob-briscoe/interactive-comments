import { ThemeColor } from '../model/theme.type';

export function getColor(theme: ThemeColor): string {
  switch (theme) {
    case 'danger':
      return 'soft-red';
    case 'secondary':
      return 'grayish-blue';
    case 'primary':
    default:
      return 'moderate-blue';
  }
}
