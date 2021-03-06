import { Component } from '@angular/core';
import {ToastController, IonicPage,  NavController,  NavParams} from 'ionic-angular';

import { loginandsigoutService , loginModel  } from '../../shared/shared';

import { ToastOptions } from 'ionic-angular/components/toast/toast-options';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [loginandsigoutService]
})
export class LoginPage {
  loginModel : loginModel = new loginModel();
  tostOptions : ToastOptions;
  constructor(public _toast : ToastController ,public navCtrl: NavController, public navParams: NavParams, private _loginservie: loginandsigoutService) {
    this.tostOptions = {message : 'please verify  your creditials ' , duration : 6000 ,showCloseButton: true,
    closeButtonText: 'Ok'};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  signIn() {
    let result = '';
    this._loginservie.PostLogin(this.loginModel.UserName, this.loginModel.Password).subscribe(data => {
      debugger;
      result = data;
      console.log(data);
      if(data.access_token != null) {
        localStorage.setItem("token", data.access_token);
        

        this.navCtrl.setRoot('HomePage').then(()=>this.navCtrl.remove(0,this.navCtrl.getActive().index));
      }
      else {
        console.log("To bad for you");
      }


    },
      error => {
        debugger;
        this._toast.create(this.tostOptions).present();
        console.log(error);
      }, () => {
        });



  }
}
