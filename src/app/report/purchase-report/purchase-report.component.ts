import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { SiteModel } from 'src/app/Common/sitemodel';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgTypeToSearchTemplateDirective } from '@ng-select/ng-select/lib/ng-templates.directive';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.css']
})
export class PurchaseReportComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {}; //  DataTable
	dtTrigger = new Subject(); //  DataTable
	purchasesList: SiteModel.Purchase[] = []; // Table Data list
	@ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  showloding = true;
  lodingImage = false;
  d = new Date();
	formDate = moment(this.d).subtract('days', 30).format('YYYY-MM-DD');
	formDateArry = this.formDate.split('-');
	toDate = moment(this.d).format('YYYY-MM-DD');
	toDateArry = this.toDate.split('-');
	setDateFromDate = {year:  Number(this.formDateArry[0]), month: Number(this.formDateArry[1]), day: Number(this.formDateArry[2])};
	setDateToDate = {year:  Number(this.toDateArry[0]), month: Number(this.toDateArry[1]), day: Number(this.toDateArry[2])};
	report:any;
  
  constructor(private dataService: WebAPIDataService, private parserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {
    this.report = {
			fromdate:this.setDateFromDate,
			todate:this.setDateToDate
		};

		this.getPurchaseByDate();
  }

  getPurchaseByDate(){
    this.loadShow();
    let fromDate = moment(this.report.fromdate).format('YYYY-MM-DD');
    let toDate = moment(this.report.todate).format('YYYY-MM-DD');

    this.dataService.getData('Purchase','getpurchasebydate',{fromdate:fromDate, todate:toDate}).pipe().subscribe(responsedata => {
      this.purchasesList = responsedata.data;
      this.dtTrigger.next();
      this.loadHide();  
    });
  }

  searchReport(){
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getPurchaseByDate();
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
