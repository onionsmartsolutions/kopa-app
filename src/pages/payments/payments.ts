import { Component } from '@angular/core';
import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utilities } from '../../app/utilities';
import { Http } from '@angular/http';
import { UserService } from '../../app/services/users';
import { LoanService } from '../../app/services/loans';
import { SettlementService } from '../../app/services/settlements';

@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html'
})
export class PaymentsPage {
  settlements : any;
  constructor(
              public navCtrl : NavController,
              public http : Http,
              public settlementService : SettlementService,
              public navParams : NavParams,
              public utils : Utilities
           ) 
  {
      let loan = navParams.get('loan');
      this.settlementService.getSettlements(loan['loan_id']).subscribe(data=>{
           this.settlements =  data.json();
      })
 
  }

}
