import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
  productList: SiteModel.Product[] = []; // Table Data list
  subCategoryList: SiteModel.SubCategory[] = [];
  categoryList: SiteModel.Category[] = [];
  showloding = true;
  lodingImage = false;
  DisplayedText: string = "";
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  product: SiteModel.Product;
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  SaveButtonText: string = "Save"

  constructor(private dataService: WebAPIDataService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.getAllProduct();
    //this.getAllSubCategory();
    this.getAllCategory();
  }

  getAllProduct(){
    this.loadShow();
    this.dataService.getData('Product','getallproduct',{}).pipe().subscribe(responsedata => {
      this.productList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();
    });
  }

  getSubCategoryById(id){
    this.dataService.getData('Product','getsubcategorybycategoryid',{id: parseInt(id)}).pipe().subscribe(responsedata => {
      this.subCategoryList = responsedata.data;
    });
  }

  getAllCategory(){
    this.dataService.getData('Product','getallcategory',{}).pipe().subscribe(responsedata => {
      this.categoryList = responsedata.data;
    });
  }

  addProduct(content) {
    this.DisplayedText = '';    
    this.modalTitle = "Add Product";
    this.SaveButtonText = "Save";
    this.product = new SiteModel.Product();
    this.modalReference = this.modalService.open(content);
  }

  editProduct(id,content){
    this.loadHide();
    this.modalTitle = "Edit Product";
    this.SaveButtonText = "Update";
    this.dataService.getData('Product','getproductbyid',{id: id}).pipe().subscribe(responsedata => {
      this.product = responsedata.data;
      this.modalReference = this.modalService.open(content);
      this.loadHide();
    });
  }

  saveProduct(){
    this.loadShow();
    if(this.product.productId==undefined || this.product.productId.toString() ==''){      
      this.product.createdBy = this.activeUser.userId;
      this.product.categoryId = (this.product.categoryId)
      this.dataService.postData('Product','saveproduct',this.product)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllProduct();
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
    else
    {
      this.product.modifiedBy = this.activeUser.userId;
      this.dataService.postData('Product','updateproduct',this.product)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllProduct();
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
