import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import {
  StatusBar,
  Splashscreen,
  OneSignal
} from 'ionic-native';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      if (!platform.is('cordova')) {
        console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
        return;
      }
      // The platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // MyApp.initPushNotification();
    });
  }

  static initPushNotification() {
    OneSignal.startInit('c6ebacc6-9d0b-499b-847d-55747dc3b3fe', '471343687203');
    OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);
    OneSignal.setSubscription(true);
    OneSignal.handleNotificationReceived().subscribe(() => {
      // do something when the notification is received.
    });
    OneSignal.handleNotificationOpened().subscribe(() => {
      // do something when the notification is opened.
    });
    OneSignal.endInit();

    OneSignal.getIds().then(data => {
      // this gives you back the new userId and pushToken associated with the device. Helpful.
    });
  }
}
