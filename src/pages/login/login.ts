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
  nombre: string = ''

  errors = false
  errorMsg = ''
  creating = false

  // ----------------------------------------
  errors_code = [
    {
      code: "auth/user-not-found",
      message: "Usuario no encontrado. Verifica el correo y la contraseña ingresada e intenta de nuevo."
    },
    {
      code: "auth/wrong-password",
      message: "Usuario no válido. Verifica el correo y la contraseña ingresada e intenta de nuevo."
    },
    {
      code: "auth/invalid-email",
      message: "Correo o contraseña no escritos correctamente."
    }
  ]

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
            this.errors = true
            this.findErrorMessage(error)
          }
        )   
  }

  checkIfErrorsAreVisible() {
    if(this.errors) {
      this.errors = false
    }
  }

  changeToPages() {
    this.creating = this.creating ? false : true
  }

  nameChanged(change: any) {
    this.checkIfErrorsAreVisible()
    this.nombre = change
  }

  emailChanged(change: any) {
    this.checkIfErrorsAreVisible()
    this.email = change
  }
  
  passwordChanged(change: any) {
    this.checkIfErrorsAreVisible()
    this.password = change
  }

  changePage() {
    setTimeout(this.changeToPages(), 3000)
  }

  getUserByUID(userUID: string) {

  }

  findErrorMessage(error: any) {
    let item = this.errors_code.find(item => { return item.code === error.code})
    this.errorMsg = item.message 
    console.log(this.errorMsg) 
  }

}
