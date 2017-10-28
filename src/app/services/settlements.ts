import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Utilities } from '../utilities';



@Injectable()
export class SettlementService {

    private SETTLEMENTS_URL="/api/settlements";

    constructor(public platform: Platform,public http:Http,public utils :Utilities) {
      

    }

    getSettlements(loan_id){
       return this.http.get(this.utils.getBaseUrl()+this.SETTLEMENTS_URL+'?loan_id='+loan_id);     
    }

    createSettlement(data){
        return this.http.post(this.utils.getBaseUrl()+this.SETTLEMENTS_URL, data);
    }

    updateSettlement(settlement_id,data){
      return this.http.put(this.utils.getBaseUrl()+this.SETTLEMENTS_URL+'settlement_id='+settlement_id, data);  
    }

  }


