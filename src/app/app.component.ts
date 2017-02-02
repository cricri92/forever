import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login'
import { PreLoginPage } from '../pages/prelogin/prelogin'

import { AuthService } from '../providers/auth-service'
import firebase from 'firebase'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>

  constructor(private platform: Platform, private auth: AuthService) {

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

    let auth = firebase.auth()

    auth.onAuthStateChanged(
      userLoggedIn => {
        if(userLoggedIn) {
          console.log("logged in")
          this.nav.setRoot(TabsPage)
        }
      }
    )
       
  }

  logOut() {
    this.auth.signOut()
  }
}
