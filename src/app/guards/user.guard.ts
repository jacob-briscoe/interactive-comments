import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  type ActivatedRouteSnapshot,
} from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import type { UserApiResponse } from '../model/api/user.type';
import { UserStore } from '../store/user.store';

export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  const username = route.paramMap.get('username');

  return userStore.loadUser(username).pipe(
    map(({ user }: UserApiResponse) => !!user),
    switchMap((isUserLoaded: boolean) => {
      if (!isUserLoaded) {
        return router.navigate(['static', 'not-found']);
      }

      return of(isUserLoaded);
    }),
  );
};
