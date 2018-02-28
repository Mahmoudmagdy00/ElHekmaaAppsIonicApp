import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  takePage : any;
  searchPage : any;

  tabToShow : number = 0 ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.searchPage = 'SearchMedicalPage';
    this.takePage = 'TakePicPage';
    this.tabToShow = this.navParams.data;


  }

  ionViewDidLoad() {
  }

  GoHome(){
    this.navCtrl.popToRoot();
  }
}
