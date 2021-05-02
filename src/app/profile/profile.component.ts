import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profileAddForm: FormGroup;
  showloding = true;
  lodingImage = false;
  user: SiteModel.UserProfile = new SiteModel.UserProfile();
  activeUser = JSON.parse(localStorage.getItem('activeUser'));

  constructor(private dataService:WebAPIDataService) { }

  ngOnInit() {
    
		this.profileAddForm = new FormGroup({
      name: new FormControl("",Validators.compose([Validators.required])),
      phone: new FormControl("",Validators.compose([Validators.required])),
      email: new FormControl(""),
      address: new FormControl("",Validators.compose([Validators.required]))
    });
    this.getUserById();
  }

  getUserById(){
    this.loadHide();
    this.dataService.getData('User','getuserbyid',{id:this.activeUser.userId}).pipe().subscribe(responsedata => {
      this.user = responsedata.data;
      this.loadHide();
    });
  }

  updateUserProfile(){
    this.user.modifiedBy = this.activeUser.userId;
      this.dataService.postData('User','updateuser',this.user)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
  }

  loadShow(){
    this.showloding = true;
    this.lodingImage = false;
  }

  loadHide(){
    this.showloding = false;
    this.lodingImage = true;
  }
}
