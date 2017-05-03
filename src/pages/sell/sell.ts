import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {EventData} from'../../providers/event-data';
import { ProfileData } from '../../providers/profile-data';

import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the Sell page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class Sell {

    public itemName: any;
    public desc: any;
    public price: any;

    public userProfile: any;
    public userName: string;
    public userPic: string;
    public itemPicture: any = null;
    public itemList;
    public yourId;

    constructor(public navCtrl: NavController,
        private camera: Camera,
        public navParams: NavParams,
        public eventData: EventData,
        public profileData: ProfileData
    ) {
         this.yourId = profileData.getUserId();
  }

    ionViewDidEnter() {
        this.profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            this.userName = this.userProfile.firstName;
            this.userPic = this.userProfile.profilePic;
        });

        //get your items
        this.profileData.getItemList().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(
                snap => {
                    rawList.push({
                        key: snap.key,
                        userName: snap.val().userName,
                        itemPrice: snap.val().itemPrice,
                        itemName: snap.val().itemName,
                        desc: snap.val().desc,
                        itemPic: snap.val().itemPic

                    });
                    return false
                });
            this.itemList = rawList;
        });
    }



    createItem(itemName, desc, price) {
        this.eventData.addItem(this.userName, itemName, price, desc, this.itemPicture,this.yourId);
        this.itemName = "";
        this.desc = "";
        this.price = "";

    }

    deleteItem(itemId) {
        this.eventData.deleteItem(itemId);
        this.eventData.removePubItem(itemId);
    }

    takePicture() {
        this.camera.getPicture({
            quality: 95,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 500,
            targetHeight: 100,
            saveToPhotoAlbum: true
        }).then(imageData => {
            this.itemPicture = imageData;
            imageData = null;

        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sell');
  }

}
