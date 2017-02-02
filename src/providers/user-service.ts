import { Injectable } from '@angular/core';

import { UserModel } from './../helpers/models/user.model';

import { AngularFire, AngularFireAuth }  from 'angularfire2'

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  
  constructor(private fire: AngularFire, private auth: AngularFireAuth) {    
  }

  DBReference = this.fire.database
  
  getUserInDB(auth_id: string) {
      return this.DBReference
                .list('users', {
                    query: [{
                      orderByKey: 'auth_id',
                      equalTo: auth_id
                    }]

                })
  }

  createUserInDB(user: UserModel) {
      return this.DBReference
                .list('users')
                .push(user)
  }

  createUserForAuthentication(email: string, password: string) {
      return this.auth.createUser({email: email, password: password})
  }

  updateUserProfile(currentUser: any, userForUpdate: UserModel) {
      return currentUser.auth.updateProfile({ displayName: userForUpdate.name, photoURL: "" })
  }

}
