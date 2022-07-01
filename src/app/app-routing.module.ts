import { HomeComponent } from './ui/components/home/home.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('./admin/components/products/products.module').then(
            (module) => module.ProductsModule
          ),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./admin/components/customers/customers.module').then(
            (module) => module.CustomersModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./admin/components/orders/orders.module').then(
            (module) => module.OrdersModule
          ),
      },
    ],
  },
  { path: '', component: HomeComponent },
  {
    path: 'products',
    loadChildren: () =>
      import('./ui/components/products/products.module').then(
        (module) => module.ProductsModule
      ),
  },
  {
    path: 'baskets',
    loadChildren: () =>
      import('./ui/components/baskets/baskets.module').then(
        (module) => module.BasketsModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./ui/components/register/register.module').then(
        (module) => module.RegisterModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
