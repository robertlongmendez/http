import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')
  });
    return next.handle(modifiedRequest);
  }
}
// .pipe(tap(event => {console.log(event);
//       if (event.type === HttpEventType.Response) {
//         console.log('Response arrived, body data:');
//         console.log(event.body);
//       }
//     }));
