import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
import { WebAPIDataService } from '../Services/webapidata.service';
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private webAPIDataService: WebAPIDataService) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 400 || err.status === 401) {
                this.webAPIDataService.logout();
            }
            const errors = err.error.mesg;
            let mesg:any;
            if(typeof errors === 'object'){
                mesg = Object.keys(errors).map(key=> errors[key]).join(',');
            }else{
                mesg = errors;
            }
            const error = mesg || err.statusText;
            return throwError(error);
        }))
    }
}