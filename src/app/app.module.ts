import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { StatementsPage } from '../pages/statements/statements';
import { SettlementsPage } from '../pages/settlements/settlements';
import { LoansPage } from '../pages/loans/loans';
import { ActivationPage } from '../pages/activation/activation';
import { ApplyPage } from '../pages/apply/apply';
import { PaymentsPage } from '../pages/payments/payments';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Utilities } from '../app/utilities';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserService } from './services/users';
import { LoanService } from './services/loans';
import { ActivationService } from './services/activations';
import { StatementService } from './services/statements';
import { SettlementService } from './services/settlements';
import { PermissionsService } from './services/permissions';
import { PushService } from './services/push';
import { MpesaService } from './services/mpesa';
import { Sim } from 'ionic-native';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '737218d1'
  }


};

  var config = {
    apiKey: "AIzaSyBQQKNhWUfbKbgWTLait86fo99FRz_KyUY",
    authDomain: "kopa-bfcc9.firebaseapp.com",
    databaseURL: "https://kopa-bfcc9.firebaseio.com",
    projectId: "kopa-bfcc9",
    storageBucket: "kopa-bfcc9.appspot.com",
    messagingSenderId: "712132125783"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LoansPage,
    ProfilePage,
    PaymentsPage,
    StatementsPage,
    RegisterPage,
    ApplyPage,
    SettlementsPage,
    ActivationPage
  ],
  imports: [

    BrowserModule,
    HttpModule,
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ApplyPage,
    LoansPage,
    PaymentsPage,
    StatementsPage,
    ProfilePage,
    SettlementsPage,
    RegisterPage,
    ActivationPage
  ],
  providers: [
    StatusBar,
    AndroidPermissions,
    Utilities,
    Diagnostic,
    UserService,
    LoanService,
    ActivationService,
    StatementService,
    SettlementService,
    PermissionsService,
    PushService,
    SplashScreen,
    MpesaService,
    Sim,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
