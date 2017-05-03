import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Buy} from '../buy/buy';
import {Sell} from '../sell/sell';

/**
 * Generated class for the Market page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class Market {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openBuy() {
      this.navCtrl.push(Buy);
  }

  openSell() {
      this.navCtrl.push(Sell);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Market');
  }

}
