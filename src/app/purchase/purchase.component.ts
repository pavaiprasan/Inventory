import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SiteModel } from '../Common/sitemodel';
import { NotificationService } from '../Services/notification.service';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private dataService: WebAPIDataService,    
    private parserFormatter: NgbDateParserFormatter,
    private notificationService: NotificationService
    ) { }

  showloding = true;
  lodingImage = false;
  productList: SiteModel.Product[] = [];
  supplierList: SiteModel.Supplier[] = [];
  paymentTypeList: SiteModel.PaymentType[] =[];
  purchase: SiteModel.Purchase = new SiteModel.Purchase();
  productId: number;
  payment: SiteModel.Payment = new SiteModel.Payment();

  ngOnInit() {
    this.getAllProduct();
    this.getAllSupplier();
    this.getPaymentType();
  }

  getAllProduct(){
    this.loadShow();
    this.dataService.getData('Product','getallproduct',{}).pipe().subscribe(responsedata => {
      this.productList = responsedata.data;
      this.loadHide();
    });
  }

  getAllSupplier(){
    this.loadShow();
    this.dataService.getData('Supplier','getallsupplier',{}).pipe().subscribe(responsedata => {
      this.supplierList = responsedata.data;
      this.loadHide();
    });
  }

  getProductByCodeOrName(){
    this.dataService.getData('Product','getproductbycodeorname',{code: 'producrcode'}).pipe().subscribe(responsedata => {
      this.productList = responsedata.data;
    });
  }

  getProductById(id){
    this.dataService.getData('Product','getproductbyid',{id: id}).pipe().subscribe(responsedata => {
      if(responsedata.data){
        var product : SiteModel.Product = responsedata.data;
        var pp : SiteModel.PurchaseProducts = new SiteModel.PurchaseProducts();
        pp.product = null;
        pp.productId = product.productId;
        pp.quantity = 1;
        pp.purchasePrice = product.purchasePrice;
        pp.totalPrice = product.purchasePrice;
        pp.productName = product.productName;
        pp.productCode = product.productCode;
        pp.createdOn = new Date();
        this.purchase.purchaseProducts.push(pp);
        this.itemChange();
      }
    });
  }

  getPaymentType(){
    this.loadShow();
    this.dataService.getData('Purchase','getpaymentType',{}).pipe().subscribe(responsedata => {
      this.paymentTypeList = responsedata.data;
      this.loadHide();
    });
  }

  itemChange(index=''){
		let totalAmount=0;

		for (let key in this.purchase.purchaseProducts) {
			if(index){
				this.purchase.purchaseProducts[index].totalPrice = (this.purchase.purchaseProducts[index].purchasePrice * this.purchase.purchaseProducts[index].quantity);
			}else{
				this.purchase.purchaseProducts[key].totalPrice = (this.purchase.purchaseProducts[key].purchasePrice * this.purchase.purchaseProducts[key].quantity);
			}
			let num = Number(this.purchase.purchaseProducts[key].totalPrice);
			totalAmount += num;
		}
		
		setTimeout(() => {
        this.purchase.totalAmount = totalAmount;
    });
    this.amountChange();
	}

	amountChange(){
    setTimeout(() => {          
          let totalDue = this.purchase.totalAmount - this.payment.paidAmount;
          this.purchase.balanceAmount =  parseInt(totalDue.toFixed(2));
    });
	}

  deleteProduct(index:number) {
    this.purchase.purchaseProducts.splice(index, 1);
    if(this.purchase.purchaseProducts.length == 0){
      this.payment.paidAmount =parseInt('');
    }
    this.itemChange();
	}

  createPurchase(){
		this.loadShow();
		let purchaseDate = Object(this.purchase.purchaseDate);
		let date = this.parserFormatter.format(purchaseDate);
    this.purchase.purchaseDate=new Date(date);
    this.payment.paymentType = null;
    this.payment.createdOn = new Date();
    this.purchase.payment.push(this.payment)
    this.purchase.supplier  = null;
		this.dataService.postData('Purchase','savepurchase',this.purchase).pipe()
            .subscribe(data =>{
				      this.loadHide();
              this.notificationService.success('Purchases Create successful', true);
              // this.router.navigate(['purchases-details/' + data['purchase_id']]);
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
