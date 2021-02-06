import { Component, OnInit } from '@angular/core';
import { WebAPIDataService } from '../Services/webapidata.service';
import { SiteModel } from '../Common/sitemodel'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService : WebAPIDataService, private router : Router) { 
    this.userProfile = new SiteModel.UserProfile();
  }
  model: any = {};
  userProfile: SiteModel.UserProfile;
  ngOnInit() {
  }

  onLoggedin() {
    //this.loading = true;
    
    
    this.userProfile.mobile = parseInt(this.model.username);
    this.userProfile.password = this.model.password;

    
    if(this.model.username !=undefined  && this.model.password != undefined){
      console.log('kl')
      this.dataService.postData('User','authendicate',this.userProfile)
          .pipe().subscribe(
              userdata => {
                  this.userProfile = userdata.data;
                  if (this.userProfile.token) {
                    localStorage.setItem('activeUser', JSON.stringify(this.userProfile));
                    this.router.navigate(['/dashboard']);
                  }
                  else{
                    localStorage.removeItem('activeUser');
                  }                  
              },
              error => {
                  //this.alertService.error(error);
              });
      
    }
  
}
}
