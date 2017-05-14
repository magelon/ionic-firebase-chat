import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialUpload } from './social-upload';

@NgModule({
  declarations: [
    SocialUpload,
  ],
  imports: [
    IonicPageModule.forChild(SocialUpload),
  ],
  exports: [
    SocialUpload
  ]
})
export class SocialUploadModule {}
