import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';

//here use as group chat room
import {ContactChat} from'../contact-chat/contact-chat';
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

    public userName;
    public userProfile;
    public pic;

    public inviteList: any = [];
    public groupInviList: any;
    public groupList: any;
    public contactList: any;
    public roomName: any;

    constructor(public navCtrl: NavController
        , public profileData: ProfileData
        , public navParams: NavParams) {

       
        //console.log("room key"+profileData.addGroupRoom("aaa"));
        
    }

    ionViewDidEnter() {
        this.profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            this.userName = this.userProfile.firstName;
            this.pic = this.userProfile.profilePic;
        });
    }


   

    ionViewWillEnter() {

        this.profileData.getGroupInvi().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                rawList.push({
                    key: snap.key,
                    //who invited you
                    who: snap.val().who,
                    //room name
                    name: snap.val().roomName,
                    //room id
                    room: snap.val().roomId,
                    //pic of inviter
                    pic: snap.val().pic

                });
                return false
            });
            this.groupInviList = rawList;
        });

        this.profileData.getGroupList().on('value', snapshot => {
            let rawList = [];
            snapshot.forEach(snap => {
                rawList.push({
                    key: snap.key,
                    //room name
                    name: snap.val().roomName,
                    //room id
                    room: snap.val().roomId
                    

                });
                return false
            });
            this.groupList = rawList;
        });

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

    removeGroup(key) {
        this.profileData.removeGroup(key);
    }

    denyGroup(key) {
        this.profileData.denyGroup(key);
    }

    //accept group room
    acceptGroupInvi(roomName,roomId,key) {
        this.profileData.addGroupRoom(roomName,roomId,key);
    }

    openGroupChat(event) {
        this.navCtrl.push(ContactChat, event);
    }

    beginGroupChat(gname) {
        this.profileData.initGroupRoom(this.userName, gname, this.inviteList, this.pic);
    }

    addInvite(broker) {
        this.inviteList.push(broker);
        //console.log(this.inviteList);
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
