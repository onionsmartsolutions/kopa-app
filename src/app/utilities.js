var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToastController, AlertController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
var Utilities = (function () {
    function Utilities(toastCtrl, alertCtrl, storage, platform, http) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.platform = platform;
        this.http = http;
        this.BASE_URL = "http://localhost/kopesha/web";
    }
    Utilities.prototype.isEmail = function (control) {
        if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return { noEmail: true };
        }
    };
    Utilities.prototype.getBaseUrl = function () {
        return this.BASE_URL;
    };
    Utilities.prototype.showMessage = function (messageIn) {
        var toast = this.toastCtrl.create({
            message: messageIn,
            duration: 3000
        });
        toast.present();
    };
    Utilities.prototype.showDialog = function (title, messageIn) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: messageIn,
            buttons: ['OK']
        });
        alert.present();
    };
    Utilities.prototype.getDate = function () {
        var d = new Date();
        var date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
        return date;
    };
    /*
      readSMS(){
                var filter = { address : 'MPESA',  indexFrom : 0,  maxCount : 50};
              if(window.SMS) window.SMS.listSMS(filter,data=>{
                setTimeout(()=>{
                    this.smses=data;
                },0)
            },error=>{
              this.utils.showMessage(error);
              console.log(error);
            });
      }
    
      getSMS(){
    
      if (this.platform.is('cordova')) {
    
            this.permissions.checkPermission(this.permissions.PERMISSION.READ_SMS).then(
               success => this.readSMS(),
             err => this.permissions.requestPermissions(this.permissions.PERMISSION.READ_SMS)
          );
        }
      else {
        this.utils.showMessage('Not Cordova');
      }
        }
    
     
    */
    Utilities.prototype.getCurrentUser = function () {
        var _this = this;
        var response;
        this.storage.get('user_id').then(function (val) {
            _this.http.get(_this.getBaseUrl() + '/api/users?id=' + val)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                response = data;
            });
        });
        return response;
    };
    return Utilities;
}());
Utilities = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ToastController, AlertController, Storage, Platform, Http])
], Utilities);
export { Utilities };
//# sourceMappingURL=utilities.js.map