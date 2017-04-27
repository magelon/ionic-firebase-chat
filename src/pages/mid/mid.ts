import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Contact} from '../contact/contact';
import {Rooms} from '../rooms/rooms';
import {ProfilePage} from '../profile/profile';

/**
 * Generated class for the Mid page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-mid',
  templateUrl: 'mid.html',
})
export class Mid {
    Rooms: any;
    Contact: any;
    Profile: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.Rooms = Rooms;
        this.Contact = Contact;
        this.Profile = ProfilePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Mid');
  }

}
