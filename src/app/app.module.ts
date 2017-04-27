import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
//import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {Chat} from'../pages/chat/chat';
import {Login}from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import {Rooms} from '../pages/rooms/rooms';
import {Contact} from '../pages/contact/contact';
import {Mid} from '../pages/mid/mid';
import {PopOverUser} from'../pages/pop-over-user/pop-over-user';
import {Map}from '../pages/map/map';
import {ContactChat} from '../pages/contact-chat/contact-chat';

import { AuthData } from '../providers/auth-data';
import { EventData } from '../providers/event-data';

import { ProfileData } from '../providers/profile-data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
   // ContactPage,
    Map,
    HomePage,
      TabsPage,
      Chat,
      Login,
      ProfilePage,
      ResetPasswordPage,
      SignupPage,
      Rooms,
      Contact,
      Mid,
      PopOverUser,
      ContactChat

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
   // ContactPage,
      Map,
    HomePage,
      TabsPage,
      Chat,
      Login,
      ProfilePage,
      ResetPasswordPage,
      SignupPage,
      Rooms,
      Contact,
      Mid,
      PopOverUser,
      ContactChat
  ],
  providers: [
      Camera,
    StatusBar,
      SplashScreen, AuthData, ProfileData, EventData
    
       
  ]
})
export class AppModule {}
