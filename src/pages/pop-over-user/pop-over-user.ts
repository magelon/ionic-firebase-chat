import { Component } from '@angular/core';
import { NavController, NavParams, ToastController  } from 'ionic-angular';
import { ProfileData } from '../../providers/profile-data';

/**
 * Generated class for the PopOverUser page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pop-over-user',
  templateUrl: 'pop-over-user.html',
})
export class PopOverUser {

    public userProfile: any;
    public user: any;
    //your id
    public myid: any;
    //pp's id
    public userid: any;
   //name of your self
    public profileP: string;
  
    public username: string;

    constructor(private toast: ToastController,public profileData: ProfileData, public navCtrl: NavController, public navParams: NavParams) {
        this.userid = this.navParams.data;
        

        this.myid = profileData.getUserId();
     

        profileData.getUserProfile().on('value', (data) => {
            this.userProfile = data.val();
            this.username = this.userProfile.firstName;
            this.profileP = this.userProfile.profilePic;
        });

      
        //console.log(this.user);
  }

    //try get contact
    addContact() {
        this.profileData.addContactPadd(this.userid, this.username, this.myid, this.profileP);
        console.log(this.userid);
        this.presentToast();
    }


    presentToast() {
        let toast = this.toast.create({
            message: 'User was added successfully',
            duration: 1000,
            position: 'top'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            this.navCtrl.pop();
        });

        toast.present();
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOverUser');
  }

}
