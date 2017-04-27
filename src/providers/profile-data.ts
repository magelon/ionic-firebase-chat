import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class ProfileData {
  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  public profilePicture: firebase.storage.Reference;
  
  public userRooms: firebase.database.Reference;
  public messages: firebase.database.Reference;
  public pubRooms: firebase.database.Reference;
  public userContactP: firebase.database.Reference;
  public userContacts: firebase.database.Reference;

  constructor() {
      this.profilePicture = firebase.storage().ref('profilePic');
      this.messages = firebase.database().ref('/messages');
      this.currentUser = firebase.auth().currentUser;
      this.userRooms = firebase.database().ref(`/userProfile/${this.currentUser.uid}/rooms`);
      this.pubRooms = firebase.database().ref('/pubs');
      this.userContactP = firebase.database().ref(`/userProfile/${this.currentUser.uid}/contactsPadd/`);
      this.userContacts = firebase.database().ref(`/userProfile/${this.currentUser.uid}/contacts/`);
      this.userProfile = firebase.database().ref('/userProfile');

  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile.child(this.currentUser.uid);
  }

  getAllUserProfile(): firebase.database.Reference {
      return this.userProfile;
  }

  getUserRooms(): firebase.database.Reference {
      return this.userRooms;
  }

  getPubRooms(): firebase.database.Reference {
      return this.pubRooms;
  }

  getUserContactP(): firebase.database.Reference {
      return this.userContactP;
  }

  getUserContacts(): firebase.database.Reference {
      return this.userContacts;
  }

    //get userid 
  getUserId(): string {
      return this.currentUser.uid;
  }

  removeMessage(room: string, key: any): firebase.Promise<any> {
      return this.messages.child(room).child('messageList').child(key).remove()
          .then(function () {
              console.log("Remove succeeded." + key)
          })
          .catch(function (error) {
              console.log("Remove failed: " + error.message)
          });
  }

  removeContactP(userid:string,key:any): firebase.Promise<any> {
      return this.userProfile.child(userid).child('contactsPadd').child(key).remove()
          .then(function () {
              console.log("Remove succeeded."+key)
          })
          .catch(function (error) {
              console.log("Remove failed: " + error.message)
          });
  }

  removeContacts(userid: string, key: any): firebase.Promise<any> {
      return this.userProfile.child(userid).child('contacts').child(key).remove()
          .then(function () {
              
              console.log("Remove succeeded." + key)
          })
          .catch(function (error) {
              console.log("Remove failed: " + error.message)
          });
  }

  removeRoom(userid: string, key: any): firebase.Promise<any> {
      return this.userProfile.child(userid).child('rooms').child(key).remove()
          .then(function () {
             
              console.log("Remove succeeded." + key);
          })
          .catch(function (error) {
              console.log("Remove failed: " + error.message)
          });
  }
  removePub(room:string,key: any): firebase.Promise<any> {
      return this.pubRooms.child(room).remove()
          .then(function () {
          console.log("Remove succeeded." + key);
      }).catch(function (error) {
          console.log("Remove failed: " + error.message)
      });
  }


  addContact(userid: any, username: any,id:any,pic:string): firebase.Promise<any> {
      return this.userProfile.child(id).child('contacts').push(
          {
              room: userid + id,
              id: userid,
              name: username,
              pic:pic
          }
      );   
  }

  addContactSelf(userid: string, name: any, id: string,pic): firebase.Promise<any> {
      return this.userProfile.child(userid).child('contacts').push(
          {
              room: userid + id,
              id: id,
              name: name,
              pic:pic
          }
      );   
  }

  addContactRoom(userid: string,name:any, id: string): firebase.Promise<any> {
      let room: string = userid + id;
      console.log(room);
      return this.userRooms.push({
          name: room,
          pp:name
      });
  }
    //add contactroom to pp
  addContactRoomTo(userid: string,name:any, id: string): firebase.Promise<any> {
      let room: string = userid + id;
      console.log(room);
      return this.userProfile.child(id).child('rooms').push({
          name: room,
          pp:name
      });
  }

  addContactPadd(userid:string,username:string,myid:string,pic:string): firebase.Promise<any> {
      return this.userProfile.child(userid).child('contactsPadd').push(
          {
              id: myid,
              name: username,
              pic:pic
          }
      );
  }

  addRoom(nameRoom:string): firebase.Promise<any> {
      return this.userRooms.push({
          name: nameRoom,
          pp: nameRoom
      });
  }
  addRoomPub(nameRoom: string): firebase.Promise<any> {
      return this.pubRooms.child(nameRoom).set({
          
          owner: this.currentUser.uid,
          name: nameRoom,
          pp: nameRoom
      });
  }

  updateName(firstName: string, lastName: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): firebase.Promise<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  updateEmail(newEmail: string, password: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, password);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.child(this.currentUser.uid)
          .update({ email: newEmail });
      });
    });
  }


  updatePassword(newPassword: string, oldPassword: string): firebase.Promise<any> {
    const credential =  firebase.auth.EmailAuthProvider
      .credential(this.currentUser.email, oldPassword);

    return this.currentUser.reauthenticate(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password Changed");
      }, error => {
        console.log(error);
      });
    });
  }

  updatePic(pic:any):firebase.Promise<any> {
      return this.profilePicture.child(this.currentUser.uid).child('profileP.png')
          .putString(pic, 'base64', { contentType: 'image/png' })
          .then((savedPicture) => {
              this.userProfile.child(this.currentUser.uid).child('profilePic')
                  .set(savedPicture.downloadURL);
          });   
  }

}
