import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'not-found',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
