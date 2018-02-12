import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { loginandsigoutService , regData } from '../../shared/shared';
import { HomePage } from '../home/home';


/**
 * Generated class for the SignOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-out',
  templateUrl: 'sign-out.html',
  providers: [loginandsigoutService]
})
export class SignOutPage {
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

      // alert(data);

    },
      error => {
        debugger;
       console.log(error) ;
      }, () => {
        debugger;

        if (result == "OK")
          this.navCtrl.push(HomePage);
        else
          alert('Error Msg');
      });
  }
}
