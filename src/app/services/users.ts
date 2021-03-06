import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import { Utilities } from '../utilities';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

    private USER_URL="/users/";
    private request_options : any;
    constructor(
      public storage : Storage,
      public utils: Utilities,
      public firebaseAuth : AngularFireAuth,
      public http:Http) {
      this.request_options = this.utils.getDefaultRequestOptions();
    }

    getUser(value){
       return this.http.get(this.utils.getBaseUrl()+this.USER_URL+value+'/');     
    }

    getUserByEmail(email){
       return this.http.get(this.utils.getBaseUrl()+this.USER_URL+'?email='+email);     
    }

    createUser(data){
        return this.http.post(this.utils.getBaseUrl()+this.USER_URL, data, this.request_options);
    }

    updateUser(user_id,data){
      return this.http.put(this.utils.getBaseUrl()+this.USER_URL+user_id+"/", data,this.request_options);  
    }

    storeCurrentUser(value){
      this.storage.set('user',value);
    }
    
    getCurrentUser(){
      return this.storage.get('user');  
    }

    signOutUser(){
      this.storage.clear();
    }

    /*Firebase User Management*/
    createUserFB(details){
      return this.firebaseAuth.auth.createUserWithEmailAndPassword(details.email,details.password);
    }

    deleteUserFB(){
      var user = this.firebaseAuth.auth.currentUser;
      return user.delete();
    }

    



}