import { Routes } from '@angular/router';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
  {
    path: 'comments/:username',
    canActivate: [userGuard],
    loadComponent: () =>
      import('./pages/comments/comments.component').then(
        (m) => m.CommentsComponent,
      ),
  },
  {
    path: 'demo',
    loadChildren: () =>
      import('./pages/demo/demo.routes').then((m) => m.routes),
  },
  {
    path: 'static',
    loadChildren: () =>
      import('./pages/static/static.routes').then((m) => m.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'comments/juliusomo',
  },
  {
    path: '**',
    redirectTo: 'static/not-found',
  },
];
