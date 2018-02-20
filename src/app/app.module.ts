import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PushPage } from '../pages/push/push';
import { LocalPage } from '../pages/local/local';
//import { LocalNotifications } from 'ionic-native';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ConfirmPage } from '../pages/confirm/confirm';
import { Push } from '@ionic-native/push';
import { ServerService } from './server.service';
import { IpushPage } from '../pages/ipush/ipush';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocalPage,
    ConfirmPage,
    PushPage,
    IpushPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LocalPage,
    ConfirmPage,
    PushPage,
    IpushPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PushPage,
    Push,
    ServerService,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
