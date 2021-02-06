import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
  subCategoryList: SiteModel.SubCategory[] = []; // Table Data list
  categoryList: SiteModel.Category[] = [];
  showloding = true;
  lodingImage = false;
  DisplayedText: string = "";
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  subCategory: SiteModel.SubCategory;
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  SaveButtonText: string = "Save"

  constructor(private dataService: WebAPIDataService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllSubCategory();
    this.getAllCategory();
  }

  getAllSubCategory(){
    this.loadShow();
    this.dataService.getData('Product','getallsubCategory',{}).pipe().subscribe(responsedata => {
      this.subCategoryList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();
    });
  }

  getAllCategory(){
    this.dataService.getData('Product','getallcategory',{}).pipe().subscribe(responsedata => {
      this.categoryList = responsedata.data;
    });
  }

  addSubCategory(content) {
    this.DisplayedText = '';    
    this.modalTitle = "Add Sub Category";
    this.SaveButtonText = "Save";
    this.subCategory = new SiteModel.SubCategory();
    this.modalReference = this.modalService.open(content);
  }

  editSubCategory(id,content){
    this.loadHide();
    this.modalTitle = "Edit Sub Category";
    this.SaveButtonText = "Update";
    this.dataService.getData('Product','getsubcategorybyid',{id: id}).pipe().subscribe(responsedata => {
      this.subCategory = responsedata.data;
      this.modalReference = this.modalService.open(content);
      this.loadHide();
    });
  }

  saveSubCategory(){
    this.loadShow();
    if(this.subCategory.subCategoryId==undefined || this.subCategory.subCategoryId.toString() ==''){
      this.subCategory.subCategoryId = 0;
      this.subCategory.createdBy = this.activeUser.userId;
      this.dataService.postData('Product','savesubcategory',this.subCategory)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllSubCategory();
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
    else
    {
      this.subCategory.modifiedBy = this.activeUser.userId;
      this.dataService.postData('Product','updatesubcategory',this.subCategory)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllSubCategory();
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
