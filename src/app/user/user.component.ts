import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
  userList: SiteModel.UserProfile[] = []; // Table Data list
  showloding = true;
  lodingImage = false;
  DisplayedText: string = "";
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  user: SiteModel.UserProfile;
  userRole = [{id:"Admin",name:'Admin'},{id:"User",name:'User'}]; 
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  SaveButtonText: string = "Save"

  constructor(private dataService: WebAPIDataService,
              private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    this.loadShow();
    this.dataService.getData('User','getalluser',{}).pipe().subscribe(responsedata => {
      this.userList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();
    });
  }

  addUser(content) {
    this.DisplayedText = '';    
    this.modalTitle = "Add User";
    this.SaveButtonText = "Save";
    this.user = new SiteModel.UserProfile();
    this.modalReference = this.modalService.open(content);
  }

  editUser(id,content){
    this.loadHide();
    this.modalTitle = "Edit User";
    this.SaveButtonText = "Update";
    this.dataService.getData('User','getuserbyid',{id: id}).pipe().subscribe(responsedata => {
      this.user = responsedata.data;
      this.modalReference = this.modalService.open(content);
      this.loadHide();
    });
  }

  saveUser(){
    this.loadShow();
    if(this.user.userId==undefined || this.user.userId.toString() ==''){
      this.user.userId = 0;
      this.user.createdBy = this.activeUser.userId;
      this.dataService.postData('User','saveuser',this.user)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllUser();
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
    else
    {
      this.user.modifiedBy = this.activeUser.userId;
      this.dataService.postData('User','updateuser',this.user)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllUser();
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
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
