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
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { AlertController, LoadingController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { Utilities } from '../../app/utilities';
var ProfilePage = (function () {
    function ProfilePage(navCtrl, utils, loadingCtrl, toastCtrl, auth, user, alertCtrl, formBuilder) {
        this.navCtrl = navCtrl;
        this.utils = utils;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.auth = auth;
        this.user = user;
        this.alertCtrl = alertCtrl;
        this.formBuilder = formBuilder;
        this.profileForm = this.formBuilder.group({
            userName: [user.details.name, Validators.required],
            userPhone: [user.details.username, Validators.required],
            userEmail: [user.details.email, Validators.compose([Validators.required, this.utils.isEmail])],
        });
    }
    ProfilePage.prototype.saveProfile = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Updating Profile...',
        });
        loader.present();
        this.user.details.name = this.profileForm.controls['userName'].value;
        this.user.details.username = this.profileForm.controls['userPhone'].value;
        this.user.details.email = this.profileForm.controls['userEmail'].value;
        this.user.save();
        this.user.load().then(function () {
            loader.dismiss();
            _this.utils.showMessage('Profile updated');
        });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: 'page-profile',
        templateUrl: 'profile.html'
    }),
    __metadata("design:paramtypes", [NavController, Utilities, LoadingController, ToastController, Auth, User, AlertController, FormBuilder])
], ProfilePage);
export { ProfilePage };
//# sourceMappingURL=profile.js.map