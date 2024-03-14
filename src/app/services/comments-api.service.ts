import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import sampleData from '../data.json';
import { GetCommentsApiResponse } from '../model/api/get-comments.type';
import { UserApi } from '../model/api/user.type';

@Injectable({
  providedIn: 'root',
})
export class CommentsApiService {
  getComments(user: UserApi): Observable<GetCommentsApiResponse> {
    const response: GetCommentsApiResponse = {
      currentUser: sampleData.currentUser,
      comments: [],
    };

    if (user.username === response.currentUser.username) {
      Object.assign(response.comments, sampleData.comments);
    }

    return of(response).pipe(delay(1500));
  }
}
