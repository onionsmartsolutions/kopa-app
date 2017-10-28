import { Component } from '@angular/core';
import { NavController,MenuController ,Platform} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AlertController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { ActivationPage } from '../activation/activation';
import { LoginPage } from '../login/login';
import { Utilities } from '../../app/utilities';
import { UserService } from '../../app/services/users';
import { StatementService } from '../../app/services/statements';
import { Http } from '@angular/http';



declare var window : any;
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private registerForm : FormGroup;
  phone_no : any;
  user : any ;

  constructor(public menu: MenuController,
    public platform : Platform,
    public statementService : StatementService,
    public userService : UserService,
    public firebaseAuth : AngularFireAuth,
    public http: Http,
    public navCtrl: NavController,
    public utils: Utilities,
    public formBuilder :FormBuilder) {

    this.utils.getObject('sim_info').then((value) => {
      if(value!=null){
          this.registerForm.controls['phone_no'].setValue(value.phoneNumber);
          this.registerForm.controls['device_id'].setValue(value.deviceId);
          this.phone_no = value.phoneNumber; 
      }
    });

    this.registerForm  = this.formBuilder.group({

          first_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          last_name: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          national_id: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('^[0-9]+$'), Validators.required])],
          email: ['', Validators.compose([Validators.maxLength(45),this.utils.isEmail, Validators.required])],
          password: ['', Validators.required],
          phone_no: ['',  Validators.required],//Kenya Phone No. Regex
          residence: ['', Validators.required],
          device_id: ['', Validators.required],
          status: ['Pending'],
          loan_limit: ['200'],
          confirmPassword: ['', Validators.compose([
               Validators.required,
               this.isEqualPassword.bind(this)
           ])],
      });

     this.menu.swipeEnable(false);

  }

   isEqualPassword(control: FormControl): {[s: string]: boolean} {
       if (!this.registerForm) {
           return {passwordsNotMatch: true};
       }
       if (control.value !== this.registerForm.controls['password'].value) {
           return {passwordsNotMatch: true};
       }
   }



   login(){
       this.navCtrl.push(LoginPage, {}, {animate: true, direction: 'forward'});
   }

   registerUser(){

     if(this.phone_no==this.registerForm.controls['phone_no'].value){
          this.utils.createLoader("Completing Registration");
          let formData = this.registerForm.getRawValue(); // Valid JSON string{}
          let userData = JSON.stringify(formData);
          let response=this.userService.createUser(userData);
        response.subscribe(data => {
            this.user=data.json();
            this.userService.storeCurrentUser(this.user);
            /*Add user to firebase service*/
            let firebaseResponse=this.registerUserFB();
            firebaseResponse.then(auth => {
                this.utils.stopLoader();               
                this.navCtrl.setRoot(ActivationPage);
            }).catch(err => {
                 this.utils.stopLoader();
                 this.utils.showDialog('Sign Up Error',err.message);
            });
        }, error => {
            this.utils.stopLoader(); 
            var responseObj = JSON.parse(error.text()); 
            this.utils.showMessage(responseObj.detail);
        }); 
     }

     else{
         this.utils.showDialog('Invalid Phone Number','The supplied phone number does not match the sim card registered on this phone.Please try again.');
     }

   }

  registerUserFB(){
     let fireBaseUserDetails = {
          'email': this.registerForm.controls['email'].value,
          'name': this.registerForm.controls['first_name'].value+' '+this.registerForm.controls['last_name'].value,
          'password': this.registerForm.controls['password'].value
        };
    var firebaseResponse = this.userService.createUserFB(fireBaseUserDetails);
    return firebaseResponse;
    
  }

}
