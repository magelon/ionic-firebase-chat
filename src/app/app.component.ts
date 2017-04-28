import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {Chat} from'../pages/chat/chat';
import {Login}from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import {Rooms}from '../pages/rooms/rooms';
import {Mid} from '../pages/mid/mid';


import firebase from'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = Login;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

      var config = {
          apiKey: "AIzaSyAh1LL-VlwlSE82mgkunIxt7tPvLnoJXB4",
          authDomain: "mychatapp-75dc9.firebaseapp.com",
          databaseURL: "https://mychatapp-75dc9.firebaseio.com",
          projectId: "mychatapp-75dc9",
          storageBucket: "mychatapp-75dc9.appspot.com",
          messagingSenderId: "1041112918865"
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged((user) => {
        
              if (!user) {
                  this.rootPage = Login;
                 

              } else {
                  this.rootPage = Mid;
                  
              }
          
      });


      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
