import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ItemDetail } from './item-detail';

@NgModule({
  declarations: [
    ItemDetail,
  ],
 
  exports: [
    ItemDetail
  ]
})
export class ItemDetailModule {}
