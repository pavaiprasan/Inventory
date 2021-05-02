import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';
import { SiteModel } from '../sitemodel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private dataService: WebAPIDataService, private router : Router) { }

  menu:Array<SiteModel.Menu>;
  userName: string;
  userProfile: SiteModel.UserProfile;
    
  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeUser"));
    this.getMenuByUserId();
    }
  
    getMenuByUserId(){
      this.dataService.getData('Common','getmenubyuserid',{userId : this.userProfile.userId}).pipe().subscribe(responsedata => {
          this.menu = responsedata.data;
      });
    }

    logout(){
      localStorage.removeItem('activeUser');
      this.router.navigate(['/login']);
    }
}
