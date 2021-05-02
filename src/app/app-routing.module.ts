import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { CategoryComponent } from './category/category.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { LayoutComponent } from './Common/layout/layout.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseDetailsComponent } from './purchase/purchase-details/purchase-details.component';
import { PurchaseHistoryComponent } from './purchase/purchase-history/purchase-history.component';
import { PurchasePaymentComponent } from './purchase/purchase-payment/purchase-payment.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { OutofstockComponent } from './report/outofstock/outofstock.component';
import { PurchaseReportComponent } from './report/purchase-report/purchase-report.component';
import { SalesReportComponent } from './report/sales-report/sales-report.component';
import { SaleComponent } from './sale/sale.component';
import { SalesDetailsComponent } from './sale/sales-details/sales-details.component';
import { SalesHistoryComponent } from './sale/sales-history/sales-history.component';
import { SalesPaymentComponent } from './sale/sales-payment/sales-payment.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { SupplierComponent } from './supplier/supplier.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
      component: LayoutComponent,
      data: {
        title: 'Dashboard'
      },
      children: [
        {  path: 'dashboard',
           component:DashboardComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Home'}
        },
        {  path: 'user',
           component:UserComponent, 
           canActivate: [AuthGuard],
           data: {title: 'User'}
        },
        {  path: 'supplier',
           component:SupplierComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Supplier'}
        },
        {  path: 'customer',
           component:CustomerComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Customer'}
        },
        {  path: 'category',
           component:CategoryComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Category'}
        },
        {  path: 'subcategory',
           component:SubCategoryComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Sub Category'}
        },
        {  path: 'product',
           component:ProductComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Product'}
        },
        {  path: 'purchase',
           component:PurchaseComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Purchase'}
        },
        {  path: 'purchases-history',
           component:PurchaseHistoryComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Purchase History'}
        },
        {  path: 'purchases-details/:id',
           component: PurchaseDetailsComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Purchases Details'}
        },
        {  path: 'purchases-payment/:id',
           component: PurchasePaymentComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Purchases Due Payment'}
        },
        {  path: 'sales',
           component:SaleComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Sale'}
        },
        {  path: 'sales-history',
           component:SalesHistoryComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Sales History'}
        },
        {  path: 'sales-details/:id', 
           component: SalesDetailsComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Sales Details'}
        },
        {  path: 'sales-payment/:id',
           component: SalesPaymentComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Sales Due Payment'}
        },
        {  
           path: 'sales-report', 
           component: SalesReportComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Sales Report'}
        },
        {  path: 'purchases-report', 
           component: PurchaseReportComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Purchases Report'}
        },
        {  path: 'out-of-stock', 
           component: OutofstockComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Out of Stock'}
        },
        {  path: 'profile', 
           component: ProfileComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Profile'}
        },
        {  path: 'changepassword', 
           component: ChangepasswordComponent, 
           canActivate: [AuthGuard],
           data: {title: 'Change Password'}
        },
      ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
