import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalService, UserInfoViewModel } from '../../shared/shared';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [GlobalService]
})

export class HomePage {
  photos: any;
  sUserInfoViewModel: UserInfoViewModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _global: GlobalService) {
  }

  ionViewDidLoad() {
    this._global.GetUserInfo().subscribe(data => {
      debugger;
      this.sUserInfoViewModel = { UserID: JSON.parse(data._body)["UserID"] };
      console.log(this.sUserInfoViewModel);
      localStorage.setItem('userid',this.sUserInfoViewModel.UserID)
    }, error => console.log(error));

  }

  GoToTakePic() {
    let data: number = 0;
    this.navCtrl.push('TabsPage', data);
  }

  GoToSearchMedical() {

    let data: number = 1;
    this.navCtrl.push('TabsPage', data);
  }

}
