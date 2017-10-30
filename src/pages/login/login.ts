import { Component } from '@angular/core';
import { MenuController,NavController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController,LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Utilities } from '../../app/utilities';
import { Http, Headers , RequestOptions } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth'
import { UserService } from '../../app/services/users';
import { MpesaService } from '../../app/services/mpesa';
import { PushService } from '../../app/services/push';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private loginForm : FormGroup;

  constructor(
    public menu: MenuController,
    public userService: UserService,
    public firebaseAuth : AngularFireAuth,
    public navCtrl: NavController,
    public utils: Utilities,
    public auth: Auth,
    public user:User,
    public alertCtrl: AlertController,
    public formBuilder :FormBuilder) {



    this.userService.getCurrentUser().then((value) => {
      if(value!=null){
          this.loginForm.controls['userEmail'].setValue(value.email);
      } 
    });

    this.loginForm  = this.formBuilder.group({

      userEmail: ['', Validators.compose([Validators.required,this.utils.isEmail])],
          userPassword: ['', Validators.required]
      });

    this.menu.swipeEnable(false);


  }


  loginUser(){
      this.utils.createLoader('Signing in...');
      let details=
      { 
         'email': this.loginForm.controls['userEmail'].value,
         'password': this.loginForm.controls['userPassword'].value
      };

      let response=this.userService.getUserByEmail(details.email);
      response.map(res => res.json()).subscribe(data => {

            var length = Object.keys(data).length;
            if(length>0){
                let user = data[0];
                this.validateUserWithDevice(user);
            }
            else{
              this.utils.stopLoader();
              this.utils.showMessage('User with that email does not exist');
            }
          },error => {
            this.utils.showMessage(error);
      });
  }

   forgot(){
    let prompt = this.alertCtrl.create({
      title: 'Password Reset',
      message: "Please enter your email address. We will send you an email to reset your password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Send',
          handler: data => {
          this.firebaseAuth.auth.sendPasswordResetEmail(data.email).then(auth => {
               this.utils.showDialog('Password Reset Successful','A password reset link was sent to your email');
          })
         .catch(err => {
            this.utils.showMessage(err.message);
         });
            
          }
        }
      ]
    });
    prompt.present();
  
   }

   

   register(){
       this.navCtrl.push(RegisterPage, {}, {animate: true, direction: 'forward'});
   }


   validateUserWithDevice(user){
      /*Get Device Info*/
      this.utils.getObject('sim_info').then((value) => {
        if(value!=null){
            if((value.phoneNumber==user.phone_no)&&(value.deviceId==user.device_id)){
                this.firebaseAuth.auth.signInWithEmailAndPassword(this.loginForm.controls['userEmail'].value,this.loginForm.controls['userPassword'].value)
                .then(auth => {
                    this.utils.stopLoader();
                    this.userService.storeCurrentUser(user);
                    this.navCtrl.setRoot(HomePage);
                })
                .catch(err => {
                   this.utils.stopLoader();
                   this.utils.showMessage(err.message);
                });
              }
            else{
              this.utils.stopLoader();
              this.utils.showMessage('The Mobile Device or Phone Number does not match with your account details');
           }
        }
      });
   }
}
	

