import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import { LocalNotifications } from 'ionic-native';

// For date/time
import * as moment from 'moment';
import { ServerService } from '../../app/server.service';


/**
 * Generated class for the LocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-local',
  templateUrl: 'local.html',
})
export class LocalPage { 

  serverText : string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalPage');
    console.log('ionViewDidLoad About2');
    LocalNotifications.schedule({
            id: 1,
            text: 'Single ILocalNotification',
            data: 'test'
    });
  }

  public schedule() {
    // Schedule a single notification
     LocalNotifications.schedule({
     id: 1,
     title: "Test Single Notification",
     text: 'Hello, World!',
     sound: null
    });
    }
    // 5 seconds from now, one time notification!
    public scheduleDelay() {
        LocalNotifications.schedule({
        id: 1,
        title: "Test Delayed Notification (5 seconds)",
        text: "Hey!",
        at: new Date(new Date().getTime() + 5 * 1000),
        sound: null,
        // Let's use an icon from external source
        icon: "https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png"
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

  postServerNotification(){
    LocalNotifications.schedule({
      id: 10,
      title: 'Post Notification',
      text: this.serverText,
    //  data: { mydata: 'My hidden message this is' },
      at: new Date(new Date().getTime() + 5 * 1000)
    });
  }
   
    public scheduleMultiple() {
        // Schedule multiple notifications
        LocalNotifications.schedule([{
          id: 1,
          title: "Test Multiple Notification 1",
          text: 'Cheer up!',
          sound: null,
        },{
          id: 2,
          title: "Test Multiple Notification 2",
          text: 'Beautiful People!'
        }]);
    }
    time: any;
    notifications: any[] = [];
    days: any[];
    hours: number;
    minutes: number;

    constructor(public navCtrl: NavController, public navParams: NavParams,
      public platform: Platform, public alertCtrl: AlertController, private serverService: ServerService) {
  
        this.giveAlert();
        // Get the Date/Time in ISO Format
        this.time = moment(new Date()).format();
        
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
        
        this.days = [
        {title: 'Monday', day: 1, checked: false},
        {title: 'Tuesday', day: 2, checked: false},
        {title: 'Wednesday', day: 3, checked: false},
        {title: 'Thursday', day: 4, checked: false},
        {title: 'Friday', day: 5, checked: false},
        {title: 'Saturday', day: 6, checked: false},
        {title: 'Sunday', day: 0, checked: false}
        ];
    }

    giveAlert() {
      // Give the alert once the notification is clicked/scheduled
      LocalNotifications.on("click", (notifications, state) => {
                 let alert = this.alertCtrl.create({
                     title: "Notification Clicked",
                     subTitle: "You just clicked the scheduled notification",
                     buttons: ["OK"]
                 });
                 alert.present();
             });
      }
     
      setTimeChange(time){
      this.hours = time.hour.value;
      this.minutes = time.minute.value;
      }
      
      addNotifications(){
      
      let currentDate = new Date();
      let currentDay = currentDate.getDay();
      
      for(let day of this.days){
      if(day.checked){
      
      let firstNotificationTime = new Date();
      let dayDifference = day.day - currentDay;
      
      if(dayDifference < 0){
      dayDifference = dayDifference + 7;
      }
      
      firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 *(dayDifference)));
      firstNotificationTime.setHours(this.hours);
      firstNotificationTime.setMinutes(this.minutes);
      
      let notification = {
      id: day.day,
      title: 'Hey!',
      text: 'You just got notified :)',
      at: firstNotificationTime,
      every: 'week'
      };
      
      this.notifications.push(notification);
   
      }
      
      }
      
      console.log("Notifications to be scheduled: ", this.notifications);
      
      if(this.platform.is('cordova')){
      
      LocalNotifications.cancelAll().then(() => {
      
      LocalNotifications.schedule(this.notifications);
      
      this.notifications = [];
      
      let alert = this.alertCtrl.create({
      title: 'Notifications set',
      buttons: ['Ok']
      });
      
      alert.present();
      
      });
      
      }
      
      }

}
