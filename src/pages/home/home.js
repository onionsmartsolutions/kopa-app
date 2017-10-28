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
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Utilities } from '../../app/utilities';
var HomePage = (function () {
    function HomePage(navCtrl, http, utils, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.utils = utils;
        this.storage = storage;
        this.storage.get('user_id').then(function (val) {
            _this.http.get(_this.utils.getBaseUrl() + '/api/users?id=' + val)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.user = data;
            });
        });
        console.log(this.user);
        //this.checkStatus();
    }
    HomePage.prototype.checkStatus = function () {
        switch (this.user['active']) {
            case "ACTIVE":
                status = "active";
                break;
            case "PENDING":
                status = "pending";
                break;
            case "INACTIVE":
                status = "inactive";
                break;
            case "BLOCKED":
                status = "blocked";
                break;
            default:
                status = "blocked";
                break;
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, Http, Utilities, Storage])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map