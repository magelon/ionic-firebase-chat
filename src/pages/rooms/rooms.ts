import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data';
import { ProfileData } from '../../providers/profile-data';

import {Market} from'../market/market';
import {Chat} from'../chat/chat';


/**
 * Generated class for the Rooms page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class Rooms {

    public nameRoom: any;

    public userid: string;
    public roomList: any;
    public pubList: any;
    public roomName: string;
    

    constructor(public navCtrl: NavController, public navParams: NavParams, public eventData: EventData, public profileData: ProfileData) {
        this.userid = profileData.getUserId();
  }



    ionViewWillEnter() {
        this.profileData.getUserRooms().
            on('value', snapshot => {
                let rawList = [];
                snapshot.forEach(snap => {
                    rawList.push({
                        key: snap.key,
                        name: snap.val().name,
                        pp:snap.val().pp
                        

                    });
                    return false
                });
                this.roomList = rawList;
                console.log(this.roomList);
            });

        this.profileData.getPubRooms().limitToLast(12).
            on('value', snapshot => {
                let rawList = [];
                snapshot.forEach(snap => {
                    rawList.push({
                        key: snap.key,
                        name: snap.val().name,
                        pp: snap.val().pp


                    });
                    return false
                });
                this.pubList = rawList;
                console.log(this.pubList);
            });

            }
        
    openRoom(broker) {
        this.navCtrl.push(Chat, broker);
    }

    openMarket() {
        this.navCtrl.push(Market);
    }

    createRoom(nameRoom) {
        this.profileData.addRoom(nameRoom);
        this.profileData.addRoomPub(nameRoom);
        this.nameRoom = "";
    }

    removeR(roomName:string,key: any) {
        this.profileData.removeRoom(this.userid, key);
        this.profileData.removePub(roomName,key);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Rooms');
    }



}
