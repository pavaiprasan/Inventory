import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class WebAPIDataService {
    constructor(private http: HttpClient,public router: Router) { }
    apiURL: string = 'http://localhost:5001/api/'

    getCompleteURL(controller: string, action: string){
        return this.apiURL + controller + '/' + action;
    }

    login(controller: string, action: string, data : any) {
        console.log('p')
        var url = this.getCompleteURL(controller,action);
        console.log(url)
        let header = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json, text/plain, */*', 
            'Access-Control-Allow-Orgin' : '*',
            'Access-Control-Allow-Headers': 'X-Custom-Header, myheader, Accept, Content-Length, Content-Type, X-Forwaded-For'
        });
        return this.http.post(url, data,{ headers: header })
            .pipe(map((response:any) => {
                if (response.data.token) {
                    localStorage.setItem('activeUser', JSON.stringify(response));
                }
                return response;
            }));

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('activeUser');
        this.router.navigate(['/login']);
    }

    getMenu(){
        return this.http.get('../../assets/menu.json')
    }
}