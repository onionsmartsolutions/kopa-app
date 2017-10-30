import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Utilities } from '../utilities';


@Injectable()
export class LoanService {

    private LOANS_URL="/loans/";
    private request_options : any;
    constructor(public utils: Utilities,public http:Http) {
        this.request_options = this.utils.getDefaultRequestOptions();
    }

    getLoans(user_id){
       return this.http.get(this.utils.getBaseUrl()+this.LOANS_URL+'?user_id='+user_id);     
    }

    createLoan(data){
        return this.http.post(this.utils.getBaseUrl()+this.LOANS_URL, data, this.request_options);
    }

    updateLoan(loan_id,data){
      return this.http.put(this.utils.getBaseUrl()+this.LOANS_URL+loan_id, data , this.request_options);  
    }

}