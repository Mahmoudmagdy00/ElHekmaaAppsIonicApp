import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { loginandsigoutService , regData } from '../../shared/shared';

@IonicPage()
@Component({
  selector: 'page-sign-out',
  templateUrl: 'sign-out.html',
  providers: [loginandsigoutService]
})


export class SignOutPage {
  errMsg : String='';
  constructor(public navCtrl: NavController, public navParams: NavParams, private _loginservice: loginandsigoutService) {
  }
  regData : regData = new regData();

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignOutPage');
  }

  doSignup() {
    let result="";
    this._loginservice.PostSignOut(this.regData).subscribe(data => {
      debugger;
      result = data;
      console.log(data);

    },
      error => {
        debugger;
        this.errMsg = error;
        console.log(error) ;
      }, () => {
        debugger;
        this.navCtrl.push('LoginPage');

      });
  }
}
