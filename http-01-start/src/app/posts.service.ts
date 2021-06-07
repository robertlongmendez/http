import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators"
import { Subject, throwError } from "rxjs";

import { Post } from './post.model';


@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title: title, content: content};
    this.http.post<{ name: string }>(
      'https://ng-complete-guide-3747e-default-rtdb.firebaseio.com/post.json',
      postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.message);
      });
  }

  fetchPosts() {
    return this.http
    .get<{[key: string]: Post }>(
      'https://ng-complete-guide-3747e-default-rtdb.firebaseio.com/post.json'
      )
  .pipe(
    map(responseData => {
    const postArray: Post[] = [];
    for (const key in responseData) {
      if (responseData.hasOwnProperty(key)) {
         postArray.push({ ...responseData[key], id: key});
      }
   }
   return postArray;
  }),
  catchError(errorRes => {
    return throwError(errorRes);
  })
  );
  }
  deletePosts() {
    return this.http.delete('https://ng-complete-guide-3747e-default-rtdb.firebaseio.com/post.json')
  }
}
