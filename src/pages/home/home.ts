import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalPage');    
  }

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private platform: Platform, private localNotifications: LocalNotifications,
    alertCtrl: AlertController, private serverService: ServerService) {
    this.platform.ready().then((readySource) => {
      if (this.platform.is('cordova') ) {
        console.log("Platform is cordova");
      }
      else if (this.platform.is('android') || this.platform.is('ios')) {
        console.log("Platform is android");
      this.localNotifications.on('click', (notification, state) => {
        console.log("inside notification state");
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
            this.postServerNotification();
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
          console.log("id::"+this.message[0].id)  ;  
          console.log("title::"+this.message[0].title)  ;  
          this.getServerNotification();         
            },
          error => {
           console.error("There is some error to get the data");
        }
      );
}

getServerNotification(){
  this.localNotifications.schedule({
    id: this.message[0].id,
    title: this.message[0].title,
    text: this.message[0].text,
    data: { mydata: 'My hidden message this is' },
    at: new Date(new Date().getTime() + 5 * 1000)
  });
}

postServerNotification(){
  this.localNotifications.schedule({
    id: 10,
    title: 'Post Notification',
    text: this.serverText,
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
