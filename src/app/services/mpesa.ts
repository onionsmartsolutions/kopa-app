import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PermissionsService } from '../../app/services/permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Utilities } from '../../app/utilities';

declare var window: any;
@Injectable()
export class MpesaService {
   
    statements : any;
    constructor(   
      public _Diagnostic: Diagnostic,
      public utils : Utilities,
  	  private permissions: PermissionsService) {
    }


    analyze(statements){

        let amount = 0;
  	    let date = null;
  	    let type = "income";

        var data = []; 

      	for(var i=0;i<statements.length;i++){

          var message = statements[i].body
          var word = message.split(".00")
          word = word[0].split("Ksh")
          amount = word[1];

          if(message.indexOf("to")>-1){
            /*Withdrawal*/
            type = "withdrawal";
          }
          else if(message.indexOf("from")>-1){
            /*Income*/
            type = "income";
          }
          else if(message.indexOf("Give")>-1){
            type = "income";
          }
          else{
            type = "";
          }

          var dateRegEx = new RegExp("[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{2}");
          date = message.match(dateRegEx);

          var detail = {
            date : date,
            amount : amount,
            type : type
          };

          data[i] = detail;   
      	}


        /*Analyze Data*/

        var total_income = 0 ;
        var total_withdrawals = 0;

        for(var i=0;i<data.length;i++){
           if(data[i].type="income"){
              total_income=+data[i].amount;
           }
           else{
              total_withdrawals=+data[i].amount;
           }
        }

        /*Get Averages*/



    }
       
    getSMS(){
		var filter = {
	        address : 'MPESA', 
	        indexFrom : 0, // start from index 0
	        maxCount : 100, // count of SMS to return each time
	     };
		if(window.SMS) window.SMS.listSMS(filter,data=>{
		    setTimeout(()=>{
		        this.statements=data;
		    },0)

		},error=>{
		  console.log(error);
		});
    }

    checkPermissions(){
      this.permissions.getSMSPermissionStatus().then(status => {
        if (status == this._Diagnostic.permissionStatus.GRANTED) {
            this.getSMS();
        }
        else if (status == this._Diagnostic.permissionStatus.DENIED) {
            this.utils.showDialog('Permission Denied','Please Grant Kopa access to read your SMS');
        }
        else if (status == this._Diagnostic.permissionStatus.NOT_REQUESTED || status.toLowerCase() == 'not_determined') {
	            this.permissions.requestSMSPermissions().then(status=>{
	             if (status == this._Diagnostic.permissionStatus.GRANTED) {
		            this.getSMS();
		        }
            });
        }                    
      });
    }
  }


