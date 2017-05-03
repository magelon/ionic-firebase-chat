import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfileData } from '../../providers/profile-data';
import { SocialSharing } from '@ionic-native/social-sharing';

import {ItemDetail}from '../item-detail/item-detail';

/**
 * Generated class for the Buy page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html'
  
})
export class Buy {

    public itemList;

    constructor(public navCtrl: NavController,
        public profileData: ProfileData,
        private social: SocialSharing,
        public navParams: NavParams) {
    }

    ionViewWillEnter() {
        //get pub items
        this.profileData.getPubItems().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(
                snap => {
                    rawList.push({
                        key: snap.key,
                        userName: snap.val().userName,
                        itemPrice: snap.val().itemPrice,
                        itemName: snap.val().itemName,
                        desc: snap.val().desc,
                        itemPic:snap.val().itemPic,
                        sellerId:snap.val().sellerId

                    });
                    return false
                });
            this.itemList = rawList;
        });
    }

 ItemPage(item) {
      this.navCtrl.push(ItemDetail,item);
     }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Buy');
  }

}
