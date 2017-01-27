import { Injectable }       from '@angular/core';
import { AuthProviders, 
         AngularFireAuth, 
         FirebaseAuthState, 
         AuthMethods }      from 'angularfire2';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  private authState: FirebaseAuthState
  
  constructor(public $auth: AngularFireAuth) {
    this.authState = $auth.getAuth()
    $auth.subscribe(
      (state: FirebaseAuthState) => {
        this.authState = state
      }
    )
  }

  get authenticated(): boolean {
    return this.authState !== null
  }

  signInWithEmailPassword(email: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this.$auth.login({email, password}, {provider: AuthProviders.Password, method: AuthMethods.Password})
  }

  signOut() {
    return this.$auth.logout()
  }

}
