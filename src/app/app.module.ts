import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { PermisosPage } from '../pages/permisos/permisos';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { PreLoginPage } from './../pages/prelogin/prelogin';

// Services
import { AuthService } from './../providers/auth-service';

// Third-party libraries
import { AngularFireModule } from 'angularfire2'

export const firebaseConfig = {
    apiKey: "AIzaSyAXwWpQg2JT-Tbz83l_6SsqT_06Y0GJUk4",
    authDomain: "ever-449b9.firebaseapp.com",
    databaseURL: "https://ever-449b9.firebaseio.com",
    storageBucket: "ever-449b9.appspot.com",
    messagingSenderId: "330854263558"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    PermisosPage,
    TabsPage,
    LoginPage,
    PreLoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    PermisosPage,
    TabsPage,
    LoginPage,
    PreLoginPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
