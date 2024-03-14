import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import sampleData from '../data.json';
import type { UserApiResponse } from '../model/api/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  loadUser(username: string | null): Observable<UserApiResponse> {
    const response: UserApiResponse = {
      user: null,
    };

    if (sampleData.currentUser.username === username) {
      Object.assign(response, { user: sampleData.currentUser });
    }

    return of<UserApiResponse>(response).pipe(delay(1500));
  }
}
