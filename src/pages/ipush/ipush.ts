import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ServerService } from '../../app/server.service';
import { LocalNotifications } from 'ionic-native';
import { message } from '../message_model';


/**
 * Generated class for the IpushPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ipush',
  templateUrl: 'ipush.html',
})
export class IpushPage {

  serverText :string;
  message: any = []

  notificationData: message[] = [];


  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalPage');
  }

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, private serverService: ServerService) {
    this.giveAlert();

  }

  giveAlert() {
    // Give the alert once the notification is clicked/scheduled
    LocalNotifications.on("click", (notifications, state) => {
      let alert = this.alertCtrl.create({
        title: "Notification Clicked",
        subTitle: this.message.text,
        buttons: ["OK"]
      });
      alert.present();
    });
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Notification',
      message: "Please enter the message to send as a Notification",
      inputs: [
        {
          name: 'id',
          placeholder: 'Notification id'
        },
        {
          name: 'title',
          placeholder: 'Notification title'
        },
        {
          name: 'text',
          placeholder: 'Notification Message'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            console.log('Notification id' + data.id);
            console.log('Notification title' + data.title);
            console.log('Notification text' + data.text);
            this.message.id = data.id;
            this.message.title = data.title;
            this.message.text = data.text;
            this.message = data;
          //  this.notificationData.push(data);
            this.postMessage(this.message.text);
          }
        }
      ]
    });
    prompt.present();
  }


  postMessage(message) {
    console.log("Inside Post call");
    this.serverService.postMessageService(message)
      .subscribe(
      data => {
        console.log("Inside the data");
        console.log("Inside the data" + data._body);

        if (data.status === 200) {
          console.log("Success" + data._body);
          this.serverText = data._body;
          this.postServerNotification();
        } else {
          console.log("Failure" + data.status);
        }

      },
      error => {
        console.log("Failed Data to show");
      }
      );

  }

  postServerNotification() {
    LocalNotifications.schedule({
      id: 10,
      title: 'Post Notification',
      text: this.serverText,
      data: { mydata: 'My hidden message this is' },
      at: new Date(new Date().getTime() + 5 * 1000)
    });
  }

  scheduleNotification() {
    LocalNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Bugtreat Notification',
      data: { mydata: 'My hidden message this is' },
      at: new Date(new Date().getTime() + 5 * 1000)
    });
  }

}
