import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteModel } from 'src/app/Common/sitemodel';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {
  purchaseId:any;
  purchase: SiteModel.Purchase = new SiteModel.Purchase();  
  showloding = true;
  lodingImage = false;

  constructor(
    public activatedRoute: ActivatedRoute,
    private dataService: WebAPIDataService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.purchaseId = params['id'];
    });
    this.getPurchaseDetailsById(this.purchaseId);
  }

  getPurchaseDetailsById(id: number){
    this.loadShow();
    this.dataService.getData('Purchase','getpurchasedetailsbyid',{purchaseId: id}).pipe().subscribe(responsedata => {
      this.purchase = responsedata.data;
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
