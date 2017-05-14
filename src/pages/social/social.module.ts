import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Social } from './social';

@NgModule({
  declarations: [
    Social,
  ],
  imports: [
    IonicPageModule.forChild(Social),
  ],
  exports: [
    Social
  ]
})
export class SocialModule {}
