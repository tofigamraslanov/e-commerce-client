import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessagePosition,
  ToastrMessageType,
} from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastrService: CustomToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message(
              'You are not authorized to perform this operation!',
              'Unauthorized operation!',
              {
                messageType: ToastrMessageType.Warning,
                messagePosition: ToastrMessagePosition.BottomFullWidth,
              }
            );
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'Server not reachable!',
              'Server error!',
              {
                messageType: ToastrMessageType.Warning,
                messagePosition: ToastrMessagePosition.BottomFullWidth,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message('Invalid request!', 'Invalid request!', {
              messageType: ToastrMessageType.Warning,
              messagePosition: ToastrMessagePosition.BottomFullWidth,
            });
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message('Page not found!', 'Page not found!', {
              messageType: ToastrMessageType.Warning,
              messagePosition: ToastrMessagePosition.BottomFullWidth,
            });
            break;
          default:
            this.toastrService.message(
              'An unexpected error has occurred!',
              'Error!',
              {
                messageType: ToastrMessageType.Warning,
                messagePosition: ToastrMessagePosition.BottomFullWidth,
              }
            );
            break;
        }
        return of(error);
      })
    );
  }
}
