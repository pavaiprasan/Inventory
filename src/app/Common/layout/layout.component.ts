import { Component, OnInit } from '@angular/core';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';
import { SiteModel } from '../sitemodel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private dataService: WebAPIDataService) { }

  menu:any;
  userName: string;
  userProfile: SiteModel.UserProfile;
    
  ngOnInit() {
    this.userProfile = JSON.parse(localStorage.getItem("activeUser"));
    this.getMenu();
    }
  
    getMenu(){
      this.dataService.getMenu().pipe().subscribe(data => {
          this.menu = data;
      });
    }
}
