import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage , SignOutPage} from '../pages';

/**
 * Generated class for the TabsLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs-login',
  templateUrl: 'tabs-login.html',
})
export class TabsLoginPage {
  tabToShow : number;
  sLoginPage : any;
  sSignOutPage : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sLoginPage = LoginPage;
    this.sSignOutPage = SignOutPage;
  }

  ionViewDidLoad() {

  }

}
