import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let activeUser = JSON.parse(localStorage.getItem('activeUser'));
        if (activeUser && activeUser.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `token ${activeUser.token}`
                }
            });
        }
 
        return next.handle(request);
    }
}