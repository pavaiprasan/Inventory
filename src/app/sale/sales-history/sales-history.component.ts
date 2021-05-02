import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SiteModel } from 'src/app/Common/sitemodel';
import { NotificationService } from 'src/app/Services/notification.service';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
	dtTrigger = new Subject();
	salesList: SiteModel.Sales [] = []; 
	showloding = true;
  lodingImage = false;

  constructor(private dataService: WebAPIDataService,
			public router: Router,
      private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAllSales()
  }

  getAllSales(){
    this.loadShow();
    this.dataService.getData('Sales','getallsales',{}).pipe().subscribe(responsedata => { 
        this.salesList = responsedata.data;
        this.dtTrigger.next();          
        this.loadHide();
      });
  }

  getSalesDetails(id){
		this.router.navigate(['sales-details/' + id]);
	}

  makePayment(id){
		this.router.navigate(['sales-payment/' + id]);
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
