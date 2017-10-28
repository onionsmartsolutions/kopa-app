var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { MenuController, NavController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { AlertController, LoadingController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Utilities } from '../../app/utilities';
import { Http } from '@angular/http';
var LoginPage = (function () {
    function LoginPage(menu, http, navCtrl, utils, loadingCtrl, toastCtrl, auth, user, alertCtrl, formBuilder) {
        this.menu = menu;
        this.http = http;
        this.navCtrl = navCtrl;
        this.utils = utils;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.auth = auth;
        this.user = user;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.loginForm = this.formBuilder.group({
            userEmail: ['', Validators.compose([Validators.required, this.utils.isEmail])],
            userPassword: ['', Validators.required]
        });
        this.authObj = auth;
        this.http = http;
        this.menu = menu;
        this.utils = utils;
    }
    LoginPage.prototype.loginUser = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Signing in...',
        });
        loader.present();
        var details = {
            'email': this.loginForm.controls['userEmail'].value,
            'password': this.loginForm.controls['userPassword'].value
        };
        this.auth.login('basic', details).then(function () {
            loader.dismissAll();
            _this.navCtrl.setRoot(HomePage);
        }, function (err) {
            loader.dismissAll();
            console.log(err.message);
            _this.utils.showMessage('Invalid Email or Password');
        });
    };
    LoginPage.prototype.forgot = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Password Reset',
            message: "Please enter your email address. We will send you an email to reset your password.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email Address'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        _this.authObj.requestPasswordReset(data.email);
                        _this.utils.showMessage('A confirmation code was sent to your email');
                    }
                }
            ]
        });
        prompt.present();
    };
    LoginPage.prototype.register = function () {
        this.navCtrl.push(RegisterPage, {}, { animate: true, direction: 'forward' });
    };
    LoginPage.prototype.confirmReset = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Confirm Code',
            message: "Please enter the code received in your email",
            inputs: [
                {
                    name: 'code',
                    placeholder: 'Code'
                },
                {
                    name: 'passwordNew',
                    placeholder: 'New Password',
                    type: 'password'
                },
                {
                    name: 'passwordConfirm',
                    placeholder: 'Confirm Password',
                    type: 'password'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        if (data.passwordNew != data.passwordConfirm) {
                            _this.utils.showMessage('Passwords do not match');
                        }
                        else {
                            _this.authObj.confirmPasswordReset(data.code, data.passwordNew);
                            prompt.dismiss();
                            _this.utils.showMessage('Password Reset Successfully');
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [MenuController, Http, NavController, Utilities, LoadingController, ToastController, Auth, User, AlertController, FormBuilder])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map