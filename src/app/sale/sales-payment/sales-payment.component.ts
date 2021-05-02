import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SiteModel } from 'src/app/Common/sitemodel';
import { NotificationService } from 'src/app/Services/notification.service';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';

@Component({
  selector: 'app-sales-payment',
  templateUrl: './sales-payment.component.html',
  styleUrls: ['./sales-payment.component.css']
})
export class SalesPaymentComponent implements OnInit {

  salesId:any;
  sales: SiteModel.Sales = new SiteModel.Sales();  
  showloding = true;
  lodingImage = false;
  salesPayment: SiteModel.SalesPayment = new SiteModel.SalesPayment();
  paymentTypeList: SiteModel.PaymentType[] =[];

  constructor(public activatedRoute: ActivatedRoute,
    private dataService: WebAPIDataService,
    private parserFormatter: NgbDateParserFormatter,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.salesId = params['id'];
    });
    this.getsalesDetailsById(this.salesId);
    this.getPaymentType();
  }
  getsalesDetailsById(id: number){
    this.loadShow();
    this.dataService.getData('sales','getsalesdetailsbyid',{salesId: id}).pipe().subscribe(responsedata => {
      this.sales = responsedata.data;
      this.loadHide();  
    });
  }

  getPaymentType(){
    this.loadShow();
    this.dataService.getData('purchase','getpaymenttype',{}).pipe().subscribe(responsedata => {
      this.paymentTypeList = responsedata.data;
      this.loadHide();
    });
  }

  savesalespayment(){
    this.loadShow();    
    let paymentDate = Object(this.salesPayment.salesPaymentDate);
		let date = this.parserFormatter.format(paymentDate);
    this.salesPayment.salesPaymentDate=new Date(date);
    this.salesPayment.paymentType = null;
    this.salesPayment.salesId = parseInt(this.salesId);
    this.dataService.postData('sales','savesalespayment',this.salesPayment).pipe()
    .subscribe(data =>{
      if(data){
        this.loadHide();
        this.notificationService.success('Payment Paid successfully', true);
        this.getsalesDetailsById(this.salesId);
      }
      else{
        this.notificationService.error("Problem in Payment");
      }
    },error =>{
      this.notificationService.error(error);
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
