import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SiteModel } from 'src/app/Common/sitemodel';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';

@Component({
  selector: 'app-outofstock',
  templateUrl: './outofstock.component.html',
  styleUrls: ['./outofstock.component.css']
})
export class OutofstockComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
  productList: SiteModel.Product[] = []; // Table Data list
  showloding = true;
  lodingImage = false;

  constructor(private dataService: WebAPIDataService) { }

  ngOnInit() {
    this.getAllProduct();
  }
  
  getAllProduct(){
    this.loadShow();
    this.dataService.getData('Product','getallproduct',{}).pipe().subscribe(responsedata => {
      this.productList = responsedata.data;
      this.dtTrigger.next();
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
