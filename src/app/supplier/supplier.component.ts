import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
  supplierList: SiteModel.Supplier[] = []; // Table Data list
  showloding = true;
  lodingImage = false;
  DisplayedText: string = "";
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  supplier: SiteModel.Supplier;
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  SaveButtonText: string = "Save"
  
  constructor(private dataService: WebAPIDataService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllSupplier();
  }

  getAllSupplier(){
    this.loadShow();
    this.dataService.getData('Supplier','getallsupplier',{}).pipe().subscribe(responsedata => {
      this.supplierList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();
    });
  }

  addSupplier(content) {
    this.DisplayedText = '';    
    this.modalTitle = "Add Supplier";
    this.SaveButtonText = "Save";
    this.supplier = new SiteModel.Supplier();
    this.modalReference = this.modalService.open(content);
  }

  editSupplier(id,content){
    this.loadHide();
    this.modalTitle = "Edit Supplier";
    this.SaveButtonText = "Update";
    this.dataService.getData('Supplier','getSupplierbyid',{id: id}).pipe().subscribe(responsedata => {
      this.supplier = responsedata.data;
      this.modalReference = this.modalService.open(content);
      this.loadHide();
    });
  }

  saveSupplier(){
    this.loadShow();
    if(this.supplier.supplierId==undefined || this.supplier.supplierId.toString() ==''){
      this.supplier.supplierId = 0;
      this.supplier.createdBy = this.activeUser.userId;
      this.dataService.postData('Supplier','savesupplier',this.supplier)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllSupplier();
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
    else
    {
      this.supplier.modifiedBy = this.activeUser.userId;
      this.dataService.postData('Supplier','updatesupplier',this.supplier)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.dtTrigger = new Subject(); //  DataTable
            this.getAllSupplier();
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
