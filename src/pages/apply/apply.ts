import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { HomePage } from '../home/home';
import { Utilities } from '../../app/utilities';
import { Http } from '@angular/http';
import { UserService } from '../../app/services/users';
import { LoanService } from '../../app/services/loans';
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html'
})
export class ApplyPage {

  private applyForm : FormGroup;
  loan_limit ;
  loan_min  : number = 100;
  loan_amount : number =100;
  loan_balance : any
  user : any;
  dueDate : string;


  constructor(public http: Http,public loanService: LoanService,public userService: UserService,public navCtrl: NavController,public utils: Utilities, public formBuilder :FormBuilder) {
    var now = new Date();
    now.setDate(now.getDate() + 30);
    this.dueDate =  now.toISOString();
  	this.applyForm  = this.formBuilder.group({
          loanAmount: ['', Validators.required],
          loanBalance: [''],
          dueDate: [this.dueDate]
         
      });
    this.getUserLoanLimit();
    this.calculateLoan();


  }

   applyLoan(){

      this.utils.createLoader('Applying Loan...');
      
      let loanData=this.applyForm.value;
      console.log()
      let loanDetails={ 
                       user_id : this.user['idusers'],
                       creationDate : this.utils.getDate(),
                       dueDate : this.utils.getDatePlus(30),
                       loanAmount : loanData['loanAmount'],
                       status : 'PENDING',
                       loanBalance : this.loan_balance
                      };
      this.loanService.createLoan(loanDetails).subscribe(data=>{
        this.utils.stopLoader();
        this.utils.showDialog('Successful','Once Approved funds will be disbursed within 24hrs');
        this.navCtrl.setRoot(HomePage);    
      },error=>{
        this.utils.stopLoader();
         this.utils.showMessage('Loan Application Error.Please try again');
      });
   }

  getUserLoanLimit(){
     this.userService.getCurrentUser().then(data=>{
         this.user= data;
         this.loan_limit = data['loan_limit'];
     });
  }

  goBack(){
    this.navCtrl.pop();
  }

  onInputChange($event){
       this.calculateLoan();
  }
  calculateLoan(){
        let formData  = this.applyForm.value;
        this.loan_balance = 1.2 * formData['loanAmount'];
        this.loan_balance = this.loan_balance.toFixed(2);
        return this.loan_balance;
  }
}
