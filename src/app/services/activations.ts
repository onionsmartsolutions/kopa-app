import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Utilities } from '../utilities';


@Injectable()
export class ActivationService {

    private ACTIVATIONS_URL="/api/activations";

    constructor(public utils: Utilities,public http:Http) {

    }

    getActivation(user_id){
       return this.http.get(this.utils.getBaseUrl()+this.ACTIVATIONS_URL+'?user_id='+user_id);     
    }

    createActivation(data){
        return this.http.post(this.utils.getBaseUrl()+this.ACTIVATIONS_URL, data);
    }

    updateActivation(activation_id,data){
      return this.http.put(this.utils.getBaseUrl()+this.ACTIVATIONS_URL+'activation_id='+activation_id, data);  
    }

}