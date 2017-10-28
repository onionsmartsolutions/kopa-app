import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Utilities } from '../utilities';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class StatementService {

    private STATEMENT_URL="/api/statements";

    constructor(
    	        public http:Http,
    	        public utils :Utilities) {
       
    }

    createStatement(user_id,data){
        return this.http.post(this.utils.getBaseUrl()+this.STATEMENT_URL, data);   
    }

    getStatement(user_id){
        return this.http.get(this.utils.getBaseUrl()+this.STATEMENT_URL+'?user_id='+user_id);     
    }

}