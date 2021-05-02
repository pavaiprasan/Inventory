import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteModel } from 'src/app/Common/sitemodel';
import { WebAPIDataService } from 'src/app/Services/webapidata.service';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {
  salesId:any;
  sales: SiteModel.Sales = new SiteModel.Sales();  
  showloding = true;
  lodingImage = false;

  constructor(public activatedRoute: ActivatedRoute,
    private dataService: WebAPIDataService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.salesId = params['id'];
    });
    this.getSalesDetailsById(this.salesId);
  }

  getSalesDetailsById(id: number){
    this.loadShow();
    this.dataService.getData('Sales','getsalesdetailsbyid',{salesId: id}).pipe().subscribe(responsedata => {
      this.sales = responsedata.data;
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
