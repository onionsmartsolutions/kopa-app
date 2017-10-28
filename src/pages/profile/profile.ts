import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { AlertController,LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
import { Utilities } from '../../app/utilities';
import { UserService } from '../../app/services/users';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  
  user_id : number;
  first_name : string;
  last_name : string;
  national_id : string;
  phone_no : string ;
  residence : string ;
  email : string;


  constructor(public navCtrl: NavController,public userService: UserService,public utils: Utilities
   ) 
      {
       this.userService.getCurrentUser().then((data) => {
          if(data!=null){
             this.setFormData(data);
          }
        });
      }

  setFormData(data){
    this.user_id = data ['id'];
    this.first_name = data ['first_name'];
    this.last_name = data ['last_name'];
    this.email = data ['email'];
    this.national_id = data ['national_id'];
    this.phone_no = data ['phone_no'];
    this.residence= data ['residence'];
  }


   saveProfile(){
     this.utils.createLoader('Updating Profile...');
     let userDetails = {

        'first_name' : this.first_name,
        'last_name' : this.last_name,
        'email' : this.email,
        'national_id' : this.national_id,
        'phone_no' : this.phone_no,
        'residence' : this.residence,
      };

           let response=this.userService.updateUser(this.user_id,userDetails);
           response.subscribe(data => {
           let user=data.json();
           this.userService.storeCurrentUser(user);
           this.utils.stopLoader();
           this.utils.showMessage('Profile Updated');

      }, error => {
           this.utils.stopLoader();
           this.utils.showMessage('Error updating profile');
      });

   }

}
