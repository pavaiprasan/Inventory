import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class WebAPIDataService {
    constructor(private http: HttpClient,public router: Router) { }
    apiURL: string = 'http://localhost:5001/api/'
    header = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/plain, */*', 
        'Access-Control-Allow-Orgin' : '*',
        'Access-Control-Allow-Headers': 'X-Custom-Header, myheader, Accept, Content-Length, Content-Type, X-Forwaded-For'
    });

    getCompleteURL(controller: string, action: string){
        return this.apiURL + controller + '/' + action;
    }

    login(controller: string, action: string, data : any) {
        var url = this.getCompleteURL(controller,action);        
        return this.http.post(url, data,{ headers: this.header })
            .pipe(map((response:any) => {                
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('activeUser');
        this.router.navigate(['/login']);
    }

    getMenuByUserId(controller: string, action: string, data : any){
        var url = this.getCompleteURL(controller,action); 
        let params = new HttpParams();
        if(data){
            for(let key in data){
                params = params.set(key,data[key])
            }
        }       
        return this.http.get(url, { params: params, headers: this.header })
            .pipe(map((response:any) => {                
                return response;
            }));
    }
}