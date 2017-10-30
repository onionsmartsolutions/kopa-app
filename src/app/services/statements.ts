import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Utilities } from '../utilities';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class StatementService {

    private STATEMENT_URL="/statements/";
    private request_options : any;
    constructor(
    	        public http:Http,
    	        public utils :Utilities) {
         this.request_options = this.utils.getDefaultRequestOptions();
    }

    createStatement(data){
        return this.http.post(this.utils.getBaseUrl()+this.STATEMENT_URL, data, this.request_options);   
    }

    getStatement(user_id){
        return this.http.get(this.utils.getBaseUrl()+this.STATEMENT_URL+'?user_id='+user_id);     
    }

}