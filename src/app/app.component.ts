import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LocalPage } from '../pages/local/local';
import { PushPage } from '../pages/push/push';
import { ConfirmPage } from '../pages/confirm/confirm';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from "ionic-angular";
import { IpushPage } from '../pages/ipush/ipush';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log("Hi Device is ready");
      statusBar.styleLightContent();
      splashScreen.hide();
      this.initPushNotification();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Local', component: LocalPage },
      { title: 'Confirm', component: ConfirmPage },
      { title: 'Push', component: PushPage },
      { title: 'IPush', component: IpushPage }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  initPushNotification() {
    // to check if we have permission
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We don\'t have permission to send push notifications');
        }
      });

    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID: '709609223040'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      //Notification Display Section
      let confirmAlert = this.alertCtrl.create({
        title: 'New Notification',
        message: JSON.stringify(notification),
        buttons: [{
          text: 'Ignore',
          role: 'cancel'
        }, {
          text: 'View',
          handler: () => {
            //TODO: Your logic here
            //self.nav.push(DetailsPage, {message: data.message});
          }
        }]
      });
      confirmAlert.present();
      //
    });
    pushObject.on('registration').
      subscribe((registration: any) =>
        console.log('Device registered', registration));
    pushObject.on('error').
      subscribe(error =>
        console.error('Error with Push plugin', error));
  }

}

