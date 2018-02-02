import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the TakePicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-take-pic',
  templateUrl: 'take-pic.html',
})
export class TakePicPage {
  public base64Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams , private _cam : Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePicPage');
  }


  takePicture(){
    this._cam.getPicture({
        destinationType: this._cam.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

}
