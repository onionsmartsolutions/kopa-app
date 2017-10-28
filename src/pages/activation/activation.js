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
import { NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { Utilities } from '../../app/utilities';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
var ActivationPage = (function () {
    function ActivationPage(navCtrl, loadingCtrl, storage, http, permissions, utils, formBuilder) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.http = http;
        this.permissions = permissions;
        this.utils = utils;
        this.formBuilder = formBuilder;
        this.activationForm = this.formBuilder.group({
            transactionCode: ['', [Validators.required, Validators.minLength(10)]],
        });
        this.storage.get('user_id').then(function (val) {
            _this.http.get(_this.utils.getBaseUrl() + '/api/users?id=' + val)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.user = data;
            });
        });
    }
    ActivationPage.prototype.activateUser = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: 'Submitting your Transaction Code...',
        });
        loader.present();
        this.user['activationMPESA'] = this.activationForm.controls['transactionCode'].value;
        this.http.put(this.utils.getBaseUrl() + '/api/users?id=' + this.user['idusers'], this.user)
            .subscribe(function (data) {
            loader.dismiss();
            _this.utils.showDialog('Transcation Posted', 'We have received your MPESA transcaction code. Once confirmed we will activate your account.You will be notifed via email.');
        }, function (error) {
            loader.dismiss();
            _this.utils.showMessage('There was an error posting your transaction code');
        });
    };
    return ActivationPage;
}());
ActivationPage = __decorate([
    Component({
        selector: 'page-activation',
        templateUrl: 'activation.html'
    }),
    __metadata("design:paramtypes", [NavController, LoadingController, Storage, Http, AndroidPermissions, Utilities, FormBuilder])
], ActivationPage);
export { ActivationPage };
//# sourceMappingURL=activation.js.map