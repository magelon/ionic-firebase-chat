import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { Buy } from './buy';

@NgModule({
  declarations: [
    Buy,
  ],
  
  exports: [
    Buy
  ]
})
export class BuyModule {}
