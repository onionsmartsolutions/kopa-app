var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ActivationPage } from '../pages/activation/activation';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CloudModule } from '@ionic/cloud-angular';
import { Utilities } from '../app/utilities';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { IonicStorageModule } from '@ionic/storage';
var cloudSettings = {
    'core': {
        'app_id': '737218d1'
    }
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            LoginPage,
            RegisterPage,
            ActivationPage
        ],
        imports: [
            BrowserModule,
            HttpModule,
            CloudModule.forRoot(cloudSettings),
            IonicModule.forRoot(MyApp),
            IonicStorageModule.forRoot()
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            LoginPage,
            RegisterPage,
            ActivationPage
        ],
        providers: [
            StatusBar,
            AndroidPermissions,
            Utilities,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler }
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map