import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, shareReplay, tap, type Observable } from 'rxjs';
import type { UserApiResponse } from '../model/api/user.type';
import type { User } from '../model/user.type';
import { UserApiService } from '../services/user-api.service';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userService: UserApiService = inject(UserApiService);

  private user = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.user.asObservable();

  get loggedInUser() {
    return this.user.getValue()!;
  }

  loadUser(username: string | null): Observable<UserApiResponse> {
    return this.userService.loadUser(username).pipe(
      tap((apiResponse: UserApiResponse) => {
        this.user.next(apiResponse.user);
      }),
      shareReplay(),
    );
  }
}
