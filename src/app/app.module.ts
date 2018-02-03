import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage , TakePicPage , SearchMedicalPage , TabsPage } from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';




@NgModule({
  declarations: [
    MyApp,
    HomePage , TakePicPage , SearchMedicalPage , TabsPage
  ],
  imports: [
    BrowserModule, HttpClientModule , HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
HomePage , TakePicPage , SearchMedicalPage ,TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
