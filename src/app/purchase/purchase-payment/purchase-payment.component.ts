import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SiteModel } from 'src/app/Common/sitemodel';
import { NotificationService } from 'src/app/Services/notification.service';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';

@Component({
  selector: 'app-purchase-payment',
  templateUrl: './purchase-payment.component.html',
  styleUrls: ['./purchase-payment.component.css']
})
export class PurchasePaymentComponent implements OnInit {
  purchaseId:any;
  purchase: SiteModel.Purchase = new SiteModel.Purchase();  
  showloding = true;
  lodingImage = false;
  payment: SiteModel.Payment = new SiteModel.Payment();
  paymentTypeList: SiteModel.PaymentType[] =[];

  constructor(
    public activatedRoute: ActivatedRoute,
    private dataService: WebAPIDataService,
    private parserFormatter: NgbDateParserFormatter,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.purchaseId = params['id'];
    });
    this.getPurchaseDetailsById(this.purchaseId);
    this.getPaymentType();
  }

  getPurchaseDetailsById(id: number){
    this.loadShow();
    this.dataService.getData('Purchase','getpurchasedetailsbyid',{purchaseId: id}).pipe().subscribe(responsedata => {
      this.purchase = responsedata.data;
      this.loadHide();  
    });
  }

  getPaymentType(){
    this.loadShow();
    this.dataService.getData('Purchase','getpaymenttype',{}).pipe().subscribe(responsedata => {
      this.paymentTypeList = responsedata.data;
      this.loadHide();
    });
  }

  savePayment(){
    this.loadShow();    
    let paymentDate = Object(this.payment.paymentDate);
		let date = this.parserFormatter.format(paymentDate);
    this.payment.paymentDate=new Date(date);
    this.payment.paymentType = null;
    this.payment.purchaseId = parseInt(this.purchaseId);
    this.dataService.postData('Purchase','savepayment',this.payment).pipe()
    .subscribe(data =>{
      if(data){
        this.loadHide();
        this.notificationService.success('Payment Paid successfully', true);
        this.getPurchaseDetailsById(this.purchaseId);
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
