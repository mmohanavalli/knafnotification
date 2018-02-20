import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { Headers, Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { ServerService } from '../../app/server.service';
import { message } from '../message_model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  serverText : string;
  public allMessage: message [];

  message:any=[]

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private platform: Platform, private localNotifications: LocalNotifications,
    alertCtrl: AlertController, private serverService: ServerService) {
    this.platform.ready().then((readySource) => {
      if (this.platform.is('cordova') ) {
        console.log("Platform is cordova");
      }
      else if (this.platform.is('android') || this.platform.is('ios')) {
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);

        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      })
    }
    });   
  } 

  postCall(){
    console.log("Inside Post call");
      this.serverService.userInfoService()
 .subscribe(
         data => {     
          console.log("Inside the data");   
          console.log("Inside the data"+data._body);               
        
          if(data.status === 200){
            console.log("Success"+data._body);
            this.serverText=data._body;
            this.serverNotification();
        }else{
          console.log("Failure"+data.status);
          }
          
        },
        error => {
           console.log("Failed Data to show");
        }
  );

}

getNotificationList(){
  this.serverService.getListOfNotificationMessage()
  .subscribe(
     data => {
          this.allMessage = data;
         // console.log("title::"+data.title)  ;           
            },
          error => {
           console.error("There is some error to get the data");
        }
      );
}

getNotification(){
  this.serverService.getNotificationMessage()
  .subscribe(
     data => {
          this.message = data;
          console.log("title::"+this.message[0].id)  ;  
          console.log("title::"+this.message[0].title)  ;  
          this.serverNotification();         
            },
          error => {
           console.error("There is some error to get the data");
        }
      );
}

serverNotification(){
  this.localNotifications.schedule({
    id: this.message.id,
    title: this.message.title,
    text: this.message.text,
    data: { mydata: 'My hidden message this is' },
    at: new Date(new Date().getTime() + 5 * 1000)
  });
}

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Bugtreat Notification',
      data: { mydata: 'My hidden message this is' },
      at: new Date(new Date().getTime() + 5 * 1000)
    });
  }

}
