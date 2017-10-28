var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth, User } from '@ionic/cloud-angular';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ActivationPage } from '../pages/activation/activation';
var MyApp = (function () {
    function MyApp(platform, alertCtrl, auth, user, statusBar, splashScreen) {
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.user = user;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = HomePage;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', icon: 'home', component: HomePage },
            { title: 'My Profile', icon: 'contact', component: HomePage },
            { title: 'My Loans', icon: 'pricetags', component: HomePage },
            { title: 'Activation ', icon: 'pricetags', component: ActivationPage },
        ];
        this.authUser();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.navtoPage = function (page) {
        this.nav.push(page.component);
    };
    MyApp.prototype.signOut = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Sign out and Exit ?',
            message: '',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Ok',
                    handler: function () {
                        _this.exitApp();
                    }
                }
            ]
        });
        confirm.present();
        this.auth.logout();
    };
    MyApp.prototype.authUser = function () {
        if (this.auth.isAuthenticated()) {
            this.rootPage = HomePage;
        }
        else {
            this.rootPage = LoginPage;
        }
    };
    MyApp.prototype.exitApp = function () {
        this.auth.logout();
        this.platform.exitApp();
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform, AlertController, Auth, User, StatusBar, SplashScreen])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map