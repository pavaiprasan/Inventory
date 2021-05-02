import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SiteModel } from '../Common/sitemodel';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };  
  barChartLabels:any[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
  daywisereport: SiteModel.DaywiseReport = new SiteModel.DaywiseReport();
  showloding = true;
  lodingImage = false;
  barChartData:any=[];
  chartData: SiteModel.ChartData = new SiteModel.ChartData();
  dashboardData: SiteModel.Dashboard = new SiteModel.Dashboard();

  constructor(private dataService: WebAPIDataService) { }
  
  ngOnInit() {
    this.barChartData = [
      {data: [0], label: 'Purchases'},
      {data: [0], label: 'Sales'}
    ];
    this.getDaywiseReport();
    this.getChartData();
    this.getDashboardData();
  }

  getDaywiseReport(){
	var date = moment(new Date).format('YYYY-MM-DD');
  this.loadShow();
    this.dataService.getData('Common','getdaywisereport',{fdate:date, tdate:date}).pipe().subscribe(responsedata => {
      this.daywisereport = responsedata.data;
      this.loadHide();
    });
  }

  getChartData(){
    var tdate = moment(new Date).format('YYYY-MM-DD');
    var d = new Date().getDate();
    var fdate = moment(new Date).subtract('year', 1).format('YYYY-MM-DD');

    this.loadShow();
    this.dataService.getData('Common','getchartdata',{fdate:fdate, tdate:tdate}).pipe().subscribe(responsedata => {
      let salesAmountArray = []; 
      this.chartData = responsedata.data;
      this.chartData.sales.forEach (item => {
        this.barChartLabels.push(item.date);
        salesAmountArray.push(item.amount);
      });
      let purchaseAmountArray = []; 
      this.chartData.purchase.forEach( item =>  {
        this.barChartLabels.push(item.date);
        purchaseAmountArray.push(item.amount);
      });

      this.barChartData = [
        {data: purchaseAmountArray, label: 'Purchases'},
        {data: salesAmountArray, label: 'Sales'}
      ];
      this.loadHide();
    });
  }

  getDashboardData(){
    this.loadShow();
    this.dataService.getData('Common','getdashboarddata',{}).pipe().subscribe(responsedata => {
      this.dashboardData = responsedata.data;
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
