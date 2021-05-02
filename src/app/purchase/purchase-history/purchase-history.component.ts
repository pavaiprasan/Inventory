import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SiteModel } from 'src/app/Common/sitemodel';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';


@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
	purchasesList: SiteModel.Purchase[] = []; // Table Data list
  showloding = true;
  lodingImage = false;

  constructor(public router: Router,private dataService: WebAPIDataService) { }

  ngOnInit() {
		this.getAllPurchase();
  }

  getAllPurchase(){
    this.loadShow();
    this.dataService.getData('Purchase','getallpurchase',{}).pipe().subscribe(responsedata => {
      this.purchasesList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();  
    });
  }
  
  purchasesDetails(id){
		this.router.navigate(['purchases-details/' + id]);
	}

  payBalance(id){
		this.router.navigate(['purchases-payment/' + id]);
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
