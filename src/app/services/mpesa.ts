import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http,Response,RequestOptions,Headers } from '@angular/http';


@Injectable()
export class MpesaService {

    private MPESA_URL="http://localhost/mpesa/example/sample/public/";

    constructor(
      public http:Http) {

    }

    requestPayment(){
        return this.http.post('http://localhost/mpesa/example/sample/public/api/request/payment/3000/name/Gray/phone/254718199017','');   
    }
}