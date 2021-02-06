import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { CategoryComponent } from './category/category.component';
import { LayoutComponent } from './Common/layout/layout.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { PurchaseComponent } from './purchase/purchase.component';
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
