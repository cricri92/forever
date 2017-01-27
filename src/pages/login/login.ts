import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth-service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string = ''
  password: string = ''
  errors = false
  errorMsg = ''

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.auth
        .signInWithEmailPassword(this.email, this.password)
        .then(
            userLoggedIn => {
                console.log(userLoggedIn)
                this.getUserByUID(userLoggedIn.uid)
            }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    console.log('login button pressed')
    console.log(this.email, this.password)
  }

  createAccount() {
    console.log('create new account pressed')
  }

  getUserByUID(userUID: string) {

  }

}
