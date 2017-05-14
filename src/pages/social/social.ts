import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SocialUpload}from'../social-upload/social-upload';
/**
 * Generated class for the Social page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-social',
  templateUrl: 'social.html',
})
export class Social {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Social');
  }

uploadPage(){
this.navCtrl.push('SocialUpload');

}

}
