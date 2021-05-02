import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateParserFormatter, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SiteModel } from '../Common/sitemodel';
import { NotificationService } from '../Services/notification.service';
import { WebAPIDataService } from '../Services/webapidata.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  productList: SiteModel.Product[] = [];
  showloding = true;
  lodingImage = false;
  customerList: SiteModel.Customer[] = [];
  paymentTypeList: SiteModel.PaymentType[] =[];
  sales: SiteModel.Sales = new SiteModel.Sales();
  salesPayment : SiteModel.SalesPayment = new SiteModel.SalesPayment();
  productCode: string;
  productId: string;
  DisplayedText: string = "";
  modalReference:NgbActiveModal;
  options: NgbModalOptions = {size: 'lg'};
  modalTitle:string;
  customer: SiteModel.Customer;
  activeUser = JSON.parse(localStorage.getItem('activeUser'));
  mobile: number;

  constructor(private dataService: WebAPIDataService,
    private modalService: NgbModal,
    private parserFormatter: NgbDateParserFormatter,
    private notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.getAllProduct();
    this.getAllCustomer();
    this.getPaymentType();
  }

  getAllProduct(){
    this.loadShow();
    this.dataService.getData('Product','getallproduct',{}).pipe().subscribe(responsedata => {
      this.productList = responsedata.data;
      this.productList = this.productList.filter(p => p.status == 1);
      this.loadHide();
    });
  }

  getAllCustomer(){
    this.loadShow();
    this.dataService.getData('Customer','getallcustomer',{}).pipe().subscribe(responsedata => {
      this.customerList = responsedata.data;
      this.customerList = this.customerList.filter(c => c.status = 1);
      if(this.mobile > 0)
        this.findCustomerByMobile();
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
  
  productCodeChange(){
    this.dataService.getData('Product','getproductbycodeorname',{code: this.productCode}).pipe().subscribe(responsedata => {
      if(responsedata.data){
        var product : SiteModel.Product = responsedata.data;
        var pp : SiteModel.SalesProducts = new SiteModel.SalesProducts();
        pp.product = null;
        pp.productId = product.productId;
        pp.quantity = 1;
        pp.salesPrice = product.sellingPrice;
        pp.totalPrice = product.sellingPrice;
        pp.productName = product.productName;
        
        pp.productCode = product.productCode;
        pp.createdOn = new Date();
        this.sales.salesProducts.push(pp);
        this.sales.discount = 0;
        this.productId = responsedata.data.productId;
        this.itemChange();
      }
      else{
        this.productId = '';
      }
    });
  }

  productChange(){
    this.dataService.getData('Product','getproductbyid',{id: this.productId}).pipe().subscribe(responsedata => {
      if(responsedata.data){
        var product : SiteModel.Product = responsedata.data;
        var pp : SiteModel.SalesProducts = new SiteModel.SalesProducts();
        pp.product = null;
        pp.productId = product.productId;
        pp.quantity = 1;
        pp.salesPrice = product.sellingPrice;
        pp.totalPrice = product.sellingPrice;
        pp.productName = product.productName;
        
        pp.productCode = product.productCode;
        pp.createdOn = new Date();
        this.sales.salesProducts.push(pp);        
        this.productCode = responsedata.data.productCode;
        this.sales.discount = 0;
        this.itemChange();
      }
      else{
        this.productCode = '';
      }
    });
  }

  itemChange(index=''){
		let totalAmount=0;

		for (let key in this.sales.salesProducts) {
			if(index){
				this.sales.salesProducts[index].totalPrice = (this.sales.salesProducts[index].salesPrice * this.sales.salesProducts[index].quantity);
			}else{
				this.sales.salesProducts[key].totalPrice = (this.sales.salesProducts[key].salesPrice * this.sales.salesProducts[key].quantity);
			}
			let num = Number(this.sales.salesProducts[key].totalPrice);
			totalAmount += num;
		}
		
		setTimeout(() => {
        this.sales.salesAmount = totalAmount;
    });
    this.changeGrandTotal();
	}

  amountChange(){
    setTimeout(() => {          
          let totalDue = this.sales.totalAmount - this.salesPayment.paidAmount;
          this.sales.balanceAmount =  parseFloat(totalDue.toFixed(2));
    });
	}

  deleteTableRow(index:number) {
		this.sales.salesProducts.splice(index, 1);
    this.itemChange();
    this.changeGrandTotal()
	}

  changeGrandTotal(){
		setTimeout(() => {
      this.sales.discount = this.sales.discount ? this.sales.discount : 0;
			let total = this.sales.salesAmount-this.sales.discount;
			this.sales.totalAmount = parseFloat(total.toFixed(2));
			this.amountChange();
		});
	}

  addCustomer(content) {
    this.modalTitle = "Add Customer";
    this.customer = new SiteModel.Customer();
    this.customer.mobile = this.mobile;
    this.modalReference = this.modalService.open(content);
  }

  saveCustomer(){
    this.loadShow();
    if(this.customer.customerId==undefined || this.customer.customerId.toString() ==''){
      this.customer.customerId = 0;
      this.customer.createdBy = this.activeUser.userId;
      this.dataService.postData('Customer','savecustomer',this.customer)
      .pipe().subscribe(
          response => {
           if(response.data){
            this.loadHide(); 
            this.modalReference.close();
            this.getAllCustomer();
            this.mobile = this.customer.mobile;            
            //this.alertService.success('User Create successful', true);
           }
          },error => {
              //this.alertService.error(error);
              this.loadHide();
          });
    }
  }

  findCustomerByMobile(){
    let cus = this.customerList.find(c => c.mobile == this.mobile);
    if(cus){
       this.sales.customerId = cus.customerId;
    }
    else{      
      this.sales.customerId = null;
    }
  }

  findCustomerById(){
    let cus = this.customerList.find(c => c.customerId == this.sales.customerId);
    if(cus){
       this.mobile = cus.mobile;
    }
    else{
      this.mobile = parseInt('');
    }
  }

  createSales(){
		this.loadShow();
		let salesDate = Object(this.sales.salesDate);
		let date = this.parserFormatter.format(salesDate);
    this.sales.salesDate=new Date(date);
    this.salesPayment.paymentType = null;
    this.salesPayment.createdOn = new Date();
    this.sales.salesPayment.push(this.salesPayment)
    this.sales.customer  = null;
		this.dataService.postData('Sales','savesales',this.sales).pipe()
            .subscribe(data =>{
				      this.loadHide();
              this.notificationService.success('Sales Create successful', true);
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
