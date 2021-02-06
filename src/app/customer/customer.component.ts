import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
  customerList: SiteModel.Customer[] = []; // Table Data list
  showloding = true;
  lodingImage = false;
  DisplayedText: string = "";
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  customer: SiteModel.Customer;
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  SaveButtonText: string = "Save"
  
  constructor(private dataService: WebAPIDataService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.loadShow();
    this.dataService.getData('Customer','getallcustomer',{}).pipe().subscribe(responsedata => {
      this.customerList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();
    });
  }

  addCustomer(content) {
    this.DisplayedText = '';    
    this.modalTitle = "Add Customer";
    this.SaveButtonText = "Save";
    this.customer = new SiteModel.Customer();
    this.modalReference = this.modalService.open(content);
  }

  editCustomer(id,content){
    this.loadHide();
    this.modalTitle = "Edit Customer";
    this.SaveButtonText = "Update";
    this.dataService.getData('Customer','getCustomerbyid',{id: id}).pipe().subscribe(responsedata => {
      this.customer = responsedata.data;
      this.modalReference = this.modalService.open(content);
      this.loadHide();
    });
  }

  saveCustomer(){
    this.loadShow();
    if(this.customer.customerId==undefined || this.customer.customerId.toString() ==''){
      this.customer.customerId = 0;
      this.customer.createdBy = this.activeUser.userId;
      this.dataService.postData('Customer','savecustomer',this.customer)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllCustomer();
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
    else
    {
      this.customer.modifiedBy = this.activeUser.userId;
      this.dataService.postData('Customer','updatecustomer',this.customer)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllCustomer();
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
