import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Market } from './market';

@NgModule({
  declarations: [
    Market,
  ],
 
  exports: [
    Market
  ]
})
export class MarketModule {}
