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
import { NavController, MenuController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { AlertController, LoadingController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { Utilities } from '../../app/utilities';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
var RegisterPage = (function () {
    function RegisterPage(menu, storage, http, navCtrl, utils, loadingCtrl, toastCtrl, auth, user, alertCtrl, formBuilder) {
        this.menu = menu;
        this.storage = storage;
        this.http = http;
        this.navCtrl = navCtrl;
        this.utils = utils;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.auth = auth;
        this.user = user;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.registerForm = this.formBuilder.group({
            full_name: ['', Validators.required],
            national_id: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, this.utils.isEmail])],
            password: ['', Validators.required],
            phone: ['', Validators.required],
            residence: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                    Validators.required,
                    this.isEqualPassword.bind(this)
                ])],
        });
        this.menu = menu;
        this.menu.swipeEnable(false);
    }
    RegisterPage.prototype.isEqualPassword = function (control) {
        if (!this.registerForm) {
            return { passwordsNotMatch: true };
        }
        if (control.value !== this.registerForm.controls['password'].value) {
            return { passwordsNotMatch: true };
        }
    };
    RegisterPage.prototype.login = function () {
        this.navCtrl.push(LoginPage, {}, { animate: true, direction: 'forward' });
    };
    RegisterPage.prototype.registerUser = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Completing Registration...',
        });
        loader.present();
        var userData = this.registerForm.value;
        this.http.post(this.utils.getBaseUrl() + '/api/users', userData)
            .subscribe(function (data) {
            var response = data.json();
            var details = {
                'email': _this.registerForm.controls['email'].value,
                'name': _this.registerForm.controls['full_name'].value,
                'password': _this.registerForm.controls['password'].value
            };
            _this.backUpUser(details);
            _this.storage.set('user_id', response['id']);
            console.log('Stored User ID');
            loader.dismiss();
            _this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
        }, function (error) {
            loader.dismiss();
            _this.utils.showMessage("Registration Error");
        });
    };
    RegisterPage.prototype.backUpUser = function (details) {
        var _this = this;
        this.auth.signup(details).then(function () {
            _this.utils.showMessage('Registration Successful');
            _this.auth.login('basic', details);
        }, function (err) {
            for (var _i = 0, _a = err.details; _i < _a.length; _i++) {
                var e = _a[_i];
                if (e === 'conflict_email') {
                    _this.utils.showMessage('Email already exists');
                }
                else if (e === 'required_email') {
                    _this.utils.showMessage('Email is required');
                }
                else if (e === 'required_password') {
                    _this.utils.showMessage('Password is required');
                }
                else if (e === 'invalid_email') {
                    _this.utils.showMessage('Valid Email required');
                }
                else {
                    _this.utils.showMessage('Phone Number already exists');
                }
            }
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Component({
        selector: 'page-register',
        templateUrl: 'register.html'
    }),
    __metadata("design:paramtypes", [MenuController, Storage, Http, NavController, Utilities, LoadingController, ToastController, Auth, User, AlertController, FormBuilder])
], RegisterPage);
export { RegisterPage };
//# sourceMappingURL=register.js.map