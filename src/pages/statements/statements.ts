import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Utilities } from '../../app/utilities';
import { Http } from '@angular/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PermissionsService } from '../../app/services/permissions';
import { Diagnostic } from '@ionic-native/diagnostic';
import { StatementService } from '../../app/services/statements';
import { UserService } from '../../app/services/users';
declare var window: any;
@Component({
  selector: 'page-statements',
  templateUrl: 'statements.html'
})
export class StatementsPage {
  statements : any;
  user : any;

  constructor(public navCtrl : NavController,
    public _Diagnostic: Diagnostic,
  	private permissions: PermissionsService,
    public statementService : StatementService,
    public userService : UserService,
    public utils : Utilities) 
  {
      this.userService.getCurrentUser().then(data=>{
           this.user = data;
      }); 
      if(this.utils.isMobilePlatform()){
          this.checkPermissions();
      }
  }

   getSMS(){
   	var filter = {
            address : 'MPESA', 
            indexFrom : 0, // start from index 0
            maxCount : 50, // count of SMS to return each time
          };
    if(window.SMS) window.SMS.listSMS(filter,data=>{
        setTimeout(()=>{
            console.log(data);
            this.statements=data;
        },0)
 
    },error=>{
      console.log(error);
    });
  }

  saveStatement(){
    if(this.statements!=null){
 
       this.utils.createLoader('Uploading Statements...');
       let count = 0;
       this.statements.forEach(function(statement) 
       { 
          let statementDetails = {
            "user" : this.user.id,
            "details" : statement.body,
          };
          this.statementService.createStatement(statementDetails).subscribe(data=>{
             
             if(count==this.statements.length-1){
               this.utils.stopLoader();
               this.utils.showMessage('Statements uploaded successfully');
             }
             else{
                count++;
             }

          });
       });
   
        
    }
    else{
      this.utils.showMessage('No statements found');
    }
      
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






  	
 


