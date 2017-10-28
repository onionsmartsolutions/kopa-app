import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Utilities } from '../../app/utilities';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

declare var FCMPlugin;
@Injectable()
export class PushService {
    public messaging : any;
  
    constructor() {
       this.messaging = firebase.messaging();
    }

    requestPermission(){
	
    }

	getToken(){
	 
    }
}
