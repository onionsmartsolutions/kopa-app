import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApplyPage } from '../pages/apply/apply';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoansPage } from '../pages/loans/loans';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { StatementsPage } from '../pages/statements/statements';
import { ActivationPage } from '../pages/activation/activation';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from '../app/services/users';
import { Utilities } from '../app/utilities';
import { Sim } from 'ionic-native';
import { PermissionsService } from '../app/services/permissions';
import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

   rootPage: any = LoginPage;
   sim_info : any;
   pages: Array<{title: string,icon :string, component: any}>;

  constructor(public platform: Platform, public _Diagnostic: Diagnostic,
    private permissions: PermissionsService, public utils : Utilities,public userService : UserService,public firebaseAuth : AngularFireAuth,public alertCtrl:AlertController,  public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
   this.pages = [
      { title: 'Home',icon: 'home' ,component: HomePage },
      { title: 'My Profile',icon: 'contact' ,component: ProfilePage },
      { title: 'My Loans',icon: 'albums' ,component: LoansPage },
      { title: 'Activation',icon: 'key' ,component: ActivationPage },
      { title: 'Statements',icon: 'archive' ,component: StatementsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
         if (this.platform.is('cordova')) {
              this.checkSIMPermissions();
         }
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.rootPage = LoginPage;
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  navtoPage(page){
    this.nav.push(page.component);
  }
  signOut(){
    let confirm = this.alertCtrl.create({
      title: 'Sign out and Exit ?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.exitApp();
          }
        }
      ]
    });
    confirm.present();
    
  }


  getSMS(){
    this.utils.readSMS();
  }


  readSIM(){
    Sim.getSimInfo().then(
      (info) => {
        this.utils.storeObject('sim_info',info);
      },
      (err) => this.utils.showMessage(err),
    );

    //this.utils.showMessage(this.sim_info);
    /*Store Details in Phone Object*/
    //this.utils.storeObject('sim_info',this.sim_info);
  }

  exitApp(){

     this.firebaseAuth.auth.signOut();
     this.userService.signOutUser();
     this.platform.exitApp();
  }

  /*Read SIM Details*/
  checkSIMPermissions(){
    this.permissions.getSIMPermissionStatus().then(status => {
      if (status == this._Diagnostic.permissionStatus.GRANTED) {
          this.readSIM();
      }
      else if (status == this._Diagnostic.permissionStatus.DENIED) {
          this.utils.showDialog('Permission Denied','Please Grant Kopa access to read your Phone State');
      }
      else if (status == this._Diagnostic.permissionStatus.NOT_REQUESTED || status.toLowerCase() == 'not_determined') {
            this.permissions.requestSIMPermissions().then(status=>{
             if (status == this._Diagnostic.permissionStatus.GRANTED) {
                this.readSIM();
            }
          });
      }                    
    });
  }

}
