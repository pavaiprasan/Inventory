import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router)
  { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url = state.url.split("/")[1];    
    if (localStorage.getItem('activeUser') !=null) {
        if(url !='login' && url != 'dashboard'){
            // this.AppService.checkPermission(url)
            // .pipe().subscribe(data => {  
            //   if(data['count']==0){
            //     this.router.navigate(['/dashboard']);
            //   } 
            // });
            return true;
        }
        return true;
    }else{
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
}
