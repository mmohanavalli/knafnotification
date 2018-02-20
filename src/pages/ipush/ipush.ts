import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad IpushPage');
  }

}
