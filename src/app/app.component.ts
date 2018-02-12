import { Component, ViewChild } from '@angular/core';
 import { Nav } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
// // import { HTTP_PROVIDERS } from '@angular/http'


import { HomePage  , TabsPage , TabsLoginPage , AuthProvider} from '../pages/pages';

import { SearchMedicalService } from '../shared/shared';
import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html',
  providers : [ SearchMedicalService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;


  constructor(public _auth : AuthProvider , public loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation


  }

  initializeApp() {
    // this.platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   this.statusBar.styleDefault();
    //   this.splashScreen.hide();
    // });
    this.presentLoading();
    this._auth.login().then((isLoggedIn)=>{
      if(isLoggedIn){
        this.rootPage = HomePage;
      }else {
        this.rootPage = TabsLoginPage;
      }
    });

  }



  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
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
