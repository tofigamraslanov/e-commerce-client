import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsComponent } from './baskets.component';

@NgModule({
  declarations: [BasketsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BasketsComponent }]),
  ],
})
export class BasketsModule {}
