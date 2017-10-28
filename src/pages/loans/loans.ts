import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utilities } from '../../app/utilities';
import { Http } from '@angular/http';
import { UserService } from '../../app/services/users';
import { LoanService } from '../../app/services/loans';
import { StatementService } from '../../app/services/statements';
import { ApplyPage } from '../apply/apply';
import { StatementsPage } from '../statements/statements';
import { PaymentsPage } from '../payments/payments';
import { SettlementsPage } from '../settlements/settlements';
@Component({
  selector: 'page-loans',
  templateUrl: 'loans.html'
})
export class LoansPage {
  loans : any;
  statements : any;
  constructor(
              public navCtrl : NavController,
              public alertCtrl : AlertController,
              public http : Http,
              public userService : UserService,
              public statementService : StatementService,
              public loanService : LoanService,
              public utils : Utilities,
           ) 
  {
      this.userService.getCurrentUser().then((data) => {
        if(data!=null){
           this.getAllLoans(data ['idusers']);
        }
      },error=>{
        this.utils.showMessage('No Loans Found');
      });
 
  }

  applyLoan(){

    if(this.statements!=null){

          if(this.loans!=null){
            if(this.checkEligibility()){
              this.navCtrl.push(ApplyPage, {}, {animate: true, direction: 'forward'});
            }
            else
            {
              this.utils.showDialog('Not Eligible','You cannot apply for a new loan because you have unsettled or pending loans');
            }
        }
     
        else{
             this.navCtrl.push(ApplyPage, {}, {animate: true, direction: 'forward'});   
        }
    }
    else
    {
      this.promptStatements();
    }
  }

  getAllLoans(user_id){
    this.loanService.getLoans(user_id).subscribe(data =>{
      this.loans = data.json();
    });
  }

  getAllStatements(user_id){
    this.statementService.getStatement(user_id).subscribe(data =>{
        this.statements = data.json();
    });
  }

  settleLoan(loanIn){
    this.navCtrl.push(SettlementsPage, {
       loan: loanIn
    });
  }

  viewSettlements(loanIn){
    this.navCtrl.push(PaymentsPage, {
       loan: loanIn
    });
  }

  promptStatements(){
    let confirm = this.alertCtrl.create({
      title: 'Upload your statements',
      message: 'You cannot apply for a new loan because you have not uploaded your MPESA statements. Upload Now',
      enableBackdropDismiss:false,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
             confirm.dismiss();
          }
        },
        {
          text: 'Upload Now',
          handler: () => {
             this.navCtrl.push(StatementsPage);
          }
        }
      ]
    });
    confirm.present();
  }


  checkEligibility(){

    for (var i = 0; i < this.loans.length; i++) { 
       if (this.loans[i]['status']=='PENDING'||this.loans[i]['status']=='UNSETTLED') {
          return false;
       }
    }
    return true;
  }
   
}
