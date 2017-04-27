import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ContactChat } from './contact-chat';

@NgModule({
  declarations: [
    ContactChat,
  ],
 
  exports: [
    ContactChat
  ]
})
export class ContactChatModule {}
