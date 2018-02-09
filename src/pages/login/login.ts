import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../pages';
import { SearchMedicalService } from '../../shared/shared';
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
  providers: [SearchMedicalService]
})
export class LoginPage {
  @ViewChild('userName') user;
  @ViewChild('password') pass;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _search: SearchMedicalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  signIn() {
    // Store
    // localStorage.setItem("userName", this.user.value);
    // localStorage.setItem("password", this.pass.value);

    // this._search.PostLogin(this.user.value, this.pass.value).subscribe(data => {
    //   debugger;
    //   console.log(data);

    // },
    //   error => { console.log(error) }, () => {
    //     debugger;
    //     this.navCtrl.push(HomePage);
    //   });;
    this._search.GetData().subscribe(data => {
      debugger;
      console.log(data);

    },
      error => { console.log(error) }, () => {
        debugger;
        this.navCtrl.push(HomePage);
      });;



  }
}
