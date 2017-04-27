import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {

    public currentUser: string;

   
    public messageid: string;
  

  public eventList: firebase.database.Reference;

  public messageList: firebase.database.Reference;
  public messageRooms: firebase.database.Reference;

  public profilePictureRef: firebase.storage.Reference;

  public pictureRef: firebase.storage.Reference;



  constructor() {

    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref(`userProfile/${this.currentUser}/eventList`);

    this.messageRooms = firebase.database().ref('/messages')

    this.messageList = firebase.database().ref('/messages/1/messageList');
    this.profilePictureRef = firebase.storage().ref('/messageImgs/');

    this.pictureRef = firebase.storage().ref('/messageImgs/1/');

 

  }
    //this is the methob get messages
  getMessageRoom(roomId): firebase.database.Reference {
      return this.messageRooms.child(roomId).child('messageList');
  }

  getMessageList(): firebase.database.Reference {
      return this.messageList;
  }
  

  getEventList(): firebase.database.Reference {
    return this.eventList;
  }

  getEventDetail(eventId): firebase.database.Reference {
    return this.eventList.child(eventId);
  }

  removeMessagePic(key: any): firebase.Promise<any> {
      return this.pictureRef.child(key).child('messagePicture.png').delete()
          .then(function () {
              console.log("Remove succeeded." + key)
          })
          .catch(function (error) {
              console.log("Remove failed: " + error.message)
          });
  }

  createMessage(userName: string, message: string, picture = null, room:string,userId:string,pic:string): firebase.Promise<any> {
      return this.messageRooms.child(room).child('messageList').push({
          userId: userId,
          name: userName,
          text: message,
          pic:pic
      }).then((newMessage) => {
          if (picture != null) {
              this.pictureRef.child(newMessage.key).child('messagePicture.png')
                  .putString(picture, 'base64', { contentType: 'image/png' })
                  .then((savedPicture) => {
                      this.messageRooms.child(room).child('messageList').child(newMessage.key).child('messagePicture')
                          .set(savedPicture.downloadURL);
                  });

          }
      });
    }

  createEvent(eventName: string, eventDate: string, eventPrice: number, 
    eventCost: number): firebase.Promise<any> {
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    });
  }

 

  addGuest(guestName, eventId, eventPrice, guestPicture = null): firebase.Promise<any> {
    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then((newGuest) => {
      this.eventList.child(eventId).transaction( (event) => {
        event.revenue += eventPrice;
        return event;
      });
      if (guestPicture != null) {
        this.profilePictureRef.child(newGuest.key).child('profilePicture.png')
      .putString(guestPicture, 'base64', {contentType: 'image/png'})
        .then((savedPicture) => {
          this.eventList.child(eventId).child('guestList').child(newGuest.key).child('profilePicture')
          .set(savedPicture.downloadURL);
        });        
      }
    });
  }

}
