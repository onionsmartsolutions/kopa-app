import { Component } from '@angular/core';
import { NavController,LoadingController,NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utilities } from '../../app/utilities';
import { Http } from '@angular/http';
import { UserService } from '../../app/services/users';
import { SettlementService } from '../../app/services/settlements';


@Component({
  selector: 'page-settlements',
  templateUrl: 'settlements.html'
})
export class SettlementsPage {
  private settlementsForm : FormGroup;
  loan : any;
  loanBalance : any;
  settlements : any;
  constructor(
              public navCtrl : NavController,
              public http : Http,
              public navParams : NavParams,
              public formBuilder :FormBuilder,
              public settlementService : SettlementService,
              public utils : Utilities
           ) 
  {

    this.settlementsForm  = this.formBuilder.group({
          amount: [0, Validators.required],
          reference: ['',Validators.required]      
      }); 
      this.loan = navParams.get('loan');
      this.loanBalance=this.loan['loanBalance'];


  }

  makeSettlement(){

      let formData = this.settlementsForm.value;

      let settlementDetails = {
        'loan_id' :this.loan['loan_id'],
        'date' : this.utils.getDate(),
        'amount' :formData['amount'],
        'reference' :formData['reference'],
        'status' : 'PENDING',
      }

      this.settlementService.createSettlement(settlementDetails).subscribe(data=>{
        this.utils.showDialog('Transaction Posted','Payment will be verified and you will be notified');
      },error=>{
        this.utils.showMessage('Error posting settlement');
      });
  }
  goBack(){
    this.navCtrl.pop();
  }
  
}
