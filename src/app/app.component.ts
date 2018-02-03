import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { HTTP_PROVIDERS } from '@angular/http'


import { HomePage  , TabsPage } from '../pages/pages';

import { SearchMedicalService } from '../shared/shared';

@Component({
  templateUrl: 'app.html',
  providers : [ SearchMedicalService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  OpenTakePicPage(){
     let data : number  = 0;
      this.nav.push(TabsPage,data);
  }
  OpenSearchMedicalPage(){
    let data : number = 1;
    this.nav.push(TabsPage,data);
  }
}
