import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
  categoryList: SiteModel.Category[] = []; // Table Data list
  showloding = true;
  lodingImage = false;
  DisplayedText: string = "";
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  category: SiteModel.Category;
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  SaveButtonText: string = "Save"
  
  constructor(private dataService: WebAPIDataService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory(){
    this.loadShow();
    this.dataService.getData('Product','getallcategory',{}).pipe().subscribe(responsedata => {
      this.categoryList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();
    });
  }

  addCategory(content) {
    this.DisplayedText = '';    
    this.modalTitle = "Add Category";
    this.SaveButtonText = "Save";
    this.category = new SiteModel.Category();
    this.modalReference = this.modalService.open(content);
  }

  editCategory(id,content){
    this.loadHide();
    this.modalTitle = "Edit Category";
    this.SaveButtonText = "Update";
    this.dataService.getData('Product','getcategorybyid',{id: id}).pipe().subscribe(responsedata => {
      this.category = responsedata.data;
      this.modalReference = this.modalService.open(content);
      this.loadHide();
    });
  }

  saveCategory(){
    this.loadShow();
    if(this.category.categoryId==undefined || this.category.categoryId.toString() ==''){
      this.category.categoryId = 0;
      this.category.createdBy = this.activeUser.userId;
      this.dataService.postData('Product','savecategory',this.category)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllCategory();
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
    else
    {
      this.category.modifiedBy = this.activeUser.userId;
      this.dataService.postData('Product','updatecategory',this.category)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllCategory();
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
