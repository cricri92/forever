import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserModel } from './../../helpers/models/user.model';

import { UserService } from './../../providers/user-service';
import { AuthService } from './../../providers/auth-service';

import { PermisosPage } from './../permisos/permisos';
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
  repeatPassword: string = ''
  nombre: string = ''

  theres_error = false
  errorMsg = ''

  creating = false

  // ----------------------------------------
  errors_code_login = [
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
    },
    {
      code: "auth/email-already-in-use",
      message: "Ya existe una cuenta asociada a este correo electrónico."
    },
    {
      code: "auth/weak-password",
      message: "La contraseña debe contener como mínimo 6 caracteres."
    }
  ]

 // ------------------------------------------

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthService,
    public uService: UserService) {}

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
            this.theres_error = true
            this.findErrorMessage(error)
          }
        )   
  }

  checkIfErrorsAreVisible() {
    if(this.theres_error) {
      this.theres_error = false
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

  repeatPasswordChanged(change: any) {
    this.checkIfErrorsAreVisible()
    this.repeatPassword = change
  }

  changePage() {
    setTimeout(this.changeToPages(), 3000)
  }

  createNewUser() {    
    this.uService
        .createUserForAuthentication(this.email, this.password)
        .then(
          newUser => {
            let newUserModel = new UserModel(this.nombre, this.email, newUser.uid, Date.now(), Date.now())
            this.uService.createUserInDB(newUserModel)
            this.uService.updateUserProfile(newUser, newUserModel)
            this.navCtrl.push(PermisosPage)
          }
        )
        .catch(
          error => {
            console.log(error)
            this.theres_error = true
            this.findErrorMessage(error)
          }
        )
    
  }

  getUserByUID(userUID: string) {
    return this.uService.getUserInDB(userUID)
  }

  findErrorMessage(error: any) {
      let item = this.errors_code_login.find(item => { return item.code === error.code})
      this.errorMsg = item.message 
      console.log(this.errorMsg) 
  }

}
