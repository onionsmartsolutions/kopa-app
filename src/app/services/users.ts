import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import { Utilities } from '../utilities';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {

    private USER_URL="/users/";

    constructor(
      public storage : Storage,
      public utils: Utilities,
      public firebaseAuth : AngularFireAuth,
      public http:Http) {

    }

    getUser(value){
       return this.http.get(this.utils.getBaseUrl()+this.USER_URL+'/'+value+'/');     
    }

    createUser(data){
        return this.http.post(this.utils.getBaseUrl()+this.USER_URL, data,{
      });
    }

    updateUser(user_id,data){
      return this.http.put(this.utils.getBaseUrl()+this.USER_URL+'?'+'user_id='+user_id, data);  
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