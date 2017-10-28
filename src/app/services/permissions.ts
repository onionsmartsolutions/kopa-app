import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
 
declare var window: any;
@Injectable()
export class PermissionsService {
 
    constructor(
        public _platform: Platform,
        public _Diagnostic: Diagnostic
    ) {
    }
 
    isAndroid() {
        return this._platform.is('android')
    }
 
    isiOS() {
        return this._platform.is('ios');
    }
 
    isUndefined(type) {
        return typeof type === "undefined";
    }
 
    pluginsAreAvailable() {
        return !this.isUndefined(window.plugins);
    }

    requestSMSPermissions(){
        let permission = this._Diagnostic.permission;
        return this._Diagnostic.requestRuntimePermission(permission.READ_SMS);
    }

    getSMSPermissionStatus(){
         let permission = this._Diagnostic.permission;
         return this._Diagnostic.getPermissionAuthorizationStatus(permission.READ_SMS);
    }

    requestSIMPermissions(){
        let permission = this._Diagnostic.permission;
        return this._Diagnostic.requestRuntimePermission(permission.READ_PHONE_STATE);
    }

    getSIMPermissionStatus(){
         let permission = this._Diagnostic.permission;
         return this._Diagnostic.getPermissionAuthorizationStatus(permission.READ_PHONE_STATE);
    }
 
 
    checkCameraPermissions(): Promise<boolean> {
        return new Promise(resolve => {
            if (!this.pluginsAreAvailable()) {
                alert('Dev: Camera plugin unavailable.');
                resolve(false);
            }
            else if (this.isiOS()) {
                this._Diagnostic.getCameraAuthorizationStatus().then(status => {
                    if (status == this._Diagnostic.permissionStatus.GRANTED) {
                        resolve(true);
                    }
                    else if (status == this._Diagnostic.permissionStatus.DENIED) {
                        resolve(false);
                    }
                    else if (status == this._Diagnostic.permissionStatus.NOT_REQUESTED || status.toLowerCase() == 'not_determined') {
                        this._Diagnostic.requestCameraAuthorization().then(authorisation => {
                            resolve(authorisation == this._Diagnostic.permissionStatus.GRANTED);
                        });
                    }                    
                });
            }
            else if (this.isAndroid()) {
                this._Diagnostic.isCameraAuthorized().then(authorised => {
                    if (authorised) {
                        resolve(true);
                    }
                    else {
                        this._Diagnostic.requestCameraAuthorization().then(authorisation => {
                            resolve(authorisation == this._Diagnostic.permissionStatus.GRANTED);
                        });
                    }
                });
            }
        });
    }
    
}