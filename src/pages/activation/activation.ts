import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { Utilities } from '../../app/utilities';
import { UserService } from '../../app/services/users';
import { MpesaService } from '../../app/services/mpesa';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html'
})
export class ActivationPage {
  
  
  constructor(
              public navCtrl : NavController,
              public loadingCtrl :LoadingController,
              public alertCtrl :AlertController,
              public userService : UserService,
              public mpesaService : MpesaService,
              public utils : Utilities,
             
           ) 
  {
   

      this.userService.getCurrentUser().then((value) => {
            //this.getActivationStatus(value['id']);
      });
       
  }

  getActivationStatus(user_id){
   
  }
  activateAccount(){
     let response = this.mpesaService.requestPayment();
     response.subscribe(data=>{
        console.log(data);
     },error=>{
        console.log(error);
     });
  }


  updatePayment(){
     
  }
  

  goToHome(){
       let alert = this.alertCtrl.create({
            title: 'Account Active :)',
            subTitle: 'Your Payment is active.No further action required',
            buttons: [
            {
              text: 'OK',
              handler: data => {
                this.navCtrl.setRoot(HomePage);
              }
            }],
          });
       alert.present();
  }
}
