import { Component, ViewChild } from '@angular/core';
import { Nav,NavController,Platform,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Response } from '@angular/http';
import { Utilities } from '../../app/utilities';
import { ActivationPage } from '../activation/activation';
import { ApplyPage } from '../apply/apply';
import { ProfilePage } from '../profile/profile';
import { SettlementsPage } from '../settlements/settlements';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../../app/services/users';
import { LoansPage } from '../loans/loans';
import { PaymentsPage } from '../payments/payments';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  title : any;
  loan_limit : any;
  user : any;

  cards: Array<{title: string,icon :string, component: any}>;

  constructor(
    public navCtrl: NavController,
    public platform:Platform,
    public alertCtrl : AlertController,
    public userService: UserService,
    public firebaseAuth : AngularFireAuth,
    public http:Http,
    public utils : Utilities,
    public storage:Storage) {
    this.userService.getCurrentUser().then((value) => {
    	if(value!=null){
        let response=this.userService.getUser(value['id']);
        response.subscribe(data=>{
            this.user=data.json();
            this.checkStatus(this.user['status']);
            this.title= "Welcome, "+this.user['full_name'];
            this.loan_limit = this.user['loan_limit'];
        }); 
    	}
    	else{
    		this.loan_limit = "N/A";
    	}
        
    });

    /*Pages*/

    this.cards = [
      { title: 'Apply for a Loan',icon: 'add-circle' ,component: LoansPage },
      { title: 'Payment History',icon: 'timer' ,component: SettlementsPage },
      { title: 'Make a Payment',icon: 'albums' ,component: PaymentsPage },
      { title: 'My Profile',icon: 'contact' ,component: ProfilePage },
    ];



 }

 checkStatus(status){
 	
     switch (status) {
     	case "PENDING":
     		this.promptActivation();
     		break;
     	case "BLOCKED":
     		this.promptExit();
     		break;
     	default:
     		break;
     }
 }

 promptActivation(){
 	 let confirm = this.alertCtrl.create({
      title: 'Activate your Account',
      message: 'Your Account is not Activated.',
      enableBackdropDismiss:false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.platform.exitApp();
          }
        },
        {
          text: 'Activate Now',
          handler: () => {
            this.navCtrl.push(ActivationPage);
          }
        }
      ]
    });
    confirm.present();
  }

  promptExit(){
  	 let alert = this.alertCtrl.create({
      title: 'Account Blocked',
      enableBackdropDismiss:false,
      subTitle: 'Your Account has been blocked.Please contact the administrator',
      buttons: [
      {
          text: 'OK',
          handler: data => {
             this.platform.exitApp();
          }
        }]
    });
    alert.present();
  }
 


  navtoPage(card){
    this.navCtrl.push(card.component);
  }


}
