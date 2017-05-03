import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Sell } from './sell';

@NgModule({
  declarations: [
    Sell,
  ],
 
  exports: [
    Sell
  ]
})
export class SellModule {}
