import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'
import { PreLoginPage } from '../pages/prelogin/prelogin'

import { AuthService } from '../providers/auth-service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav

  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform, public auth: AuthService) {

    this.launchApp()
  }

  launchApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Sentences that are executed if platform is a Cordova build.
      if(this.platform.is('cordova')) {
        StatusBar.styleDefault();
        Splashscreen.hide();
      }
    });

    if(this.auth.authenticated) {
      this.rootPage = TabsPage
    }
  }
}
