import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';

/**
 * Generated class for the GroupChat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-group-chat',
  templateUrl: 'group-chat.html',
})
export class GroupChat {

    public inviteList: any=[];
    public contactList: any;

    constructor(public navCtrl: NavController
        , public profileData: ProfileData
        , public navParams: NavParams) {
  }

    ionViewWillEnter() {
        this.profileData.getUserContacts().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                rawList.push({
                    key: snap.key,
                    name: snap.val().name,
                    id: snap.val().id,
                    room: snap.val().room,
                    pic: snap.val().pic

                });
                return false
            });
            this.contactList = rawList;
        });

    }

     
   

    addInvite(broker) {
        this.inviteList.push(broker);
        console.log(this.inviteList);
    }

    removeInvite(broker) {
        let index = this.inviteList.indexOf(broker);
        if (index > -1) {
            this.inviteList.splice(index, 1);
        }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupChat');
  }

}
