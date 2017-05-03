import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { EventData } from '../../providers/event-data';
import { ProfileData } from '../../providers/profile-data';

import { Camera, CameraOptions } from '@ionic-native/camera';

import { AdMob } from 'ionic-native';




/**
 * Generated class for the ContactChat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-chat',
  templateUrl: 'contact-chat.html',
  
})
export class ContactChat {

    public message: any;

    public userProfile: any;
    public userName: string;
    public guestPicture: any = null;

    public eventList: any;
    public room: string = null;
    //contact name
    public cName: string;

    public userId: string;
    public pic: string;


    constructor( public navCtrl: NavController, public navParams: NavParams
        , private camera: Camera, public profileData: ProfileData,
        public eventData: EventData, private toast: ToastController) {
        this.room = this.navParams.data.room;
        this.cName = this.navParams.data.name;

        this.userId = profileData.getUserId();
  }

    createMessage(userName: string, message: string) {

        this.eventData.createMessage(userName, message, this.guestPicture, this.room, this.userId, this.pic).then(() => {

            this.presentToast();

        });

        this.message ="";
        this.guestPicture = null;

    }

    takePicture() {
        this.camera.getPicture({
            quality: 95,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: this.camera.EncodingType.PNG,
            targetWidth: 200,
            targetHeight: 200,
            saveToPhotoAlbum: true
        }).then(imageData => {
            this.guestPicture = imageData;
            imageData = null;

        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });
    }

    ionViewDidEnter() {
        this.profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            this.userName = this.userProfile.firstName;
            this.pic = this.userProfile.profilePic;
        });
    }

    removeMessage(key: any) {
        this.profileData.removeMessage(this.room, key);
        this.eventData.removeMessagePic(key);
    }


    ionViewWillEnter() {

        this.eventData.getMessageRoom(this.room)
            .limitToLast(5).on('value', snapshot => {
                let rawList = [];
                snapshot.forEach(snap => {
                    rawList.push({
                        key: snap.key,
                        messagePicture: snap.val().messagePicture,
                        name: snap.val().name,
                        userId: snap.val().userId,
                        text: snap.val().text,
                        pic: snap.val().pic

                    });
                    return false
                });
                this.eventList = rawList;
            });



        /**
        this.eventData.getMessageList().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                rawList.push({
                   messagePicture:snap.val().messagePicture,
                    name: snap.val().name,
                    text: snap.val().text
                   
                });
                return false
            });
            this.eventList = rawList;
        });
        */
    }

    // goToProfile() { this.navCtrl.push(ProfilePage); }

    presentToast() {
        let toast = this.toast.create({
            message: 'Message was added successfully',
            duration: 3000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactChat');
  }

}
