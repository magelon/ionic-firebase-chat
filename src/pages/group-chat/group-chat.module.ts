import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GroupChat } from './group-chat';

@NgModule({
  declarations: [
    GroupChat,
  ],
  
  exports: [
    GroupChat
  ]
})
export class GroupChatModule {}
