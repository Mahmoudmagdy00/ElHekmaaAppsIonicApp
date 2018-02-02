import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchMedicalPage , TakePicPage } from '../pages';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  takePage : any;
  searchPage : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.searchPage = SearchMedicalPage;
    this.takePage = TakePicPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
