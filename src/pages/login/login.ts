import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { loginandsigoutService  } from '../../shared/shared';
import { HomePage } from '../pages';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [loginandsigoutService]
})
export class LoginPage {
  @ViewChild('userName') user;
  @ViewChild('password') pass;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _loginservie: loginandsigoutService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  signIn() {
    // Store
    // localStorage.setItem("userName", this.user.value);
    // localStorage.setItem("password", this.pass.value);
    let result = '';
    this._loginservie.PostLogin(this.user.value, this.pass.value).subscribe(data => {
      debugger;
      result = data;
      console.log(data);
      if(data.access_token != null) {
        // this.storage.set('access_token', response.access_token).then(() => {
        //   console.log('Token is set');
        //
        // });
        localStorage.setItem("token", data.access_token);
        console.log('Token is set' + data.access_token);

        this.navCtrl.setRoot(HomePage);
      }
      else {
        alert("To bad for you");
      }


    },
      error => {
        debugger;
        console.log(error);
      }, () => {
        debugger;

        // if (result == "OK")
        //   this.navCtrl.push(HomePage);
        // else
        //   alert('Error Msg');
      });



  }
}
