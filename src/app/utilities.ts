import { ToastController,AlertController,LoadingController, Platform } from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Storage } from '@ionic/storage';

declare var window: any;
@Injectable()

export class Utilities {

    private BASE_URL="https://egzqgiwmsg.localtunnel.me/app";
    private loader : any;
    public smsList : any;
    public response;
    constructor(public toastCtrl: ToastController,
      public loadingCtrl:LoadingController,
      public alertCtrl : AlertController,
      private permissions: AndroidPermissions ,
      public platform: Platform,
      public storage : Storage,
      public http:Http) {
      

    }

    isEmail(control: FormControl): {[s: string]: boolean} {
       if (!control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
           return {noEmail: true};
       }
    }



    getBaseUrl(){
      return this.BASE_URL;
    }

 

   showMessage(messageIn){
       let toast = this.toastCtrl.create({
        message: messageIn,
        duration: 3000
      });
      toast.present();
   }

   showDialog(title,messageIn){

      let alert = this.alertCtrl.create({
        title: title,
        enableBackdropDismiss:false,
        subTitle: messageIn,
        buttons: ['OK']
      });
      alert.present();
  
   }

   createLoader(messageIn : string){
     this.loader= this.loadingCtrl.create({
          content: messageIn,
        });;
     this.loader.present();
   }

   stopLoader(){
        this.loader.dismissAll();
   }

   changeLoaderText(text){
      this.loader.setContent(text);
   }

  getDate(){
    let d=new Date();
       let date=d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
         return date;
  }

  getDatePlus(numOfDays){

  	let d=new Date();
  	d.setDate(d.getDate() + numOfDays);
    let date=d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate();
    return date;
  }



  readSMS(){
    if(this.isMobilePlatform()){
        this.askSMSPermission().then(data=>{
          if(window.SMS){
            this.smsList = window.SMS;
          }
        });
    }
  }

  storeObject(key,value){
      this.storage.set(key,value);
  }

  getObject(key){
      return this.storage.get(key);  
  }

  askSMSPermission(){
     return this.permissions.checkPermission(this.permissions.PERMISSION.READ_SMS);
  }



  isMobilePlatform(){
    if (this.platform.is('cordova')) {
      return true;
    }
    return false;
  }

}