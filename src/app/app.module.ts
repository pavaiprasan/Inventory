import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';

//Directives
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './Common/layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { UserComponent } from './user/user.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CustomerComponent } from './customer/customer.component';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { NotificationComponent } from './Common/notification/notification.component';
import { PurchaseHistoryComponent } from './purchase/purchase-history/purchase-history.component';
import { PurchaseDetailsComponent } from './purchase/purchase-details/purchase-details.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';

//services
import { NotificationService } from './Services/notification.service';
import { SaleComponent } from './sale/sale.component';
import { SalesHistoryComponent } from './sale/sales-history/sales-history.component';
import { SalesDetailsComponent } from './sale/sales-details/sales-details.component';
import { SalesPaymentComponent } from './sale/sales-payment/sales-payment.component';
import { SalesReportComponent } from './report/sales-report/sales-report.component';
import { PurchaseReportComponent } from './report/purchase-report/purchase-report.component';
import { OutofstockComponent } from './report/outofstock/outofstock.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';



@NgModule({
  declarations: [
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    BreadcrumbsComponent,
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    UserComponent,
    SupplierComponent,
    CustomerComponent,
    CategoryComponent,
    SubCategoryComponent,
    ProductComponent,
    PurchaseComponent,
    NotificationComponent,
    PurchaseHistoryComponent,
    PurchaseDetailsComponent,
    PurchasePaymentComponent,
    SaleComponent,
    SalesHistoryComponent,
    SalesDetailsComponent,
    SalesPaymentComponent,
    SalesReportComponent,
    PurchaseReportComponent,
    OutofstockComponent,
    ProfileComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    ChartsModule,
    DataTablesModule
  ],
  providers: [
    NotificationService,
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
