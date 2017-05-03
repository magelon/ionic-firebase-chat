import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the ItemDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetail {

public item;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public social:SocialSharing) {
     this.item=this.navParams.data;
     
  }

 share() {
        this.social.share(`Item found on internet`, null, null,this.item.itemPic);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetail');
  }

}
