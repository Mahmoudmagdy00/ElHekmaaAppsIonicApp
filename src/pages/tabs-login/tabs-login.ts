import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs-login',
  templateUrl: 'tabs-login.html',
})
export class TabsLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

  GoToLogin() {
    this.navCtrl.push('LoginPage');
  }
  GoToSignOut() {
    this.navCtrl.push('SignOutPage');
  }

}
