import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { SiteModel } from 'src/app/Common/sitemodel';
import { NotificationService } from 'src/app/Services/notification.service';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
	dtTrigger = new Subject();
	salesList: SiteModel.Sales [] = []; 
	showloding = true;
  lodingImage = false;
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  d = new Date();
	formDate = moment(this.d).subtract('days', 30).format('YYYY-MM-DD');
	formDateArry = this.formDate.split('-');
	toDate = moment(this.d).format('YYYY-MM-DD');
	toDateArry = this.toDate.split('-');
	setDateFromDate = {year:  Number(this.formDateArry[0]), month: Number(this.formDateArry[1]), day: Number(this.formDateArry[2])};
	setDateToDate = {year:  Number(this.toDateArry[0]), month: Number(this.toDateArry[1]), day: Number(this.toDateArry[2])};
	report:any;

  constructor(private dataService: WebAPIDataService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.report = {
			fromdate:this.setDateFromDate,
			todate:this.setDateToDate
		};

		this.getSalesByDate();
  }

  getSalesByDate(){
    this.loadShow();
    let fromDate = moment(this.report.fromdate).format('YYYY-MM-DD');
    let toDate = moment(this.report.todate).format('YYYY-MM-DD');

    this.dataService.getData('Sales','getsalesbydate',{fromdate: fromDate, todate: toDate}).pipe().subscribe(responsedata => { 
        this.salesList = responsedata.data;
        this.dtTrigger.next();          
        this.loadHide();
      });
  }

  searchReport(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getSalesByDate();
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
