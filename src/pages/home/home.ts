import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../pages';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  photos : any  ;
  constructor(public navCtrl: NavController, public navParams: NavParams ) {
  }

  ionViewDidLoad() {

  }

  GoToTakePic(){
      let data : number = 0;
      this.navCtrl.push(TabsPage , data );
  }

  GoToSearchMedical(){

    let data   : number = 1;
    this.navCtrl.push(TabsPage , data);
  }

}
