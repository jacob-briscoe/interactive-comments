export const Icons = {
  None: '',
  Delete: 'delete',
  Edit: 'edit',
  Minus: 'minus',
  Plus: 'plus',
  Reply: 'reply',
} as const;

export type Icon = (typeof Icons)[keyof typeof Icons];
export type ProvidedIcon = Exclude<Icon, ''>;
