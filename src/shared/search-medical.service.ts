
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
@Injectable()

//  GetPositiveCommentFeeds(ItemID: string) {
//         return this._globalService.GetDataObservable('gallery/GetPositiveCommentFeeds?ItemID=' + ItemID);
//     }

//     PostPositiveFeedbacks(GalleryID: number) {
//         var dic1: Dictionary[] = [
//             new Dictionary("GalleryID", String(GalleryID)),

//         ];
//         return this._globalService.PostData('gallery/PostPositiveFeedbacks', dic1);
//     }

export class SearchMedicalService {



  constructor(private _globalService: GlobalService) {

  }



  // GetData() {
  //   return this._globalService.GetDataObservable('api/Test/GetStd');
  // }

  // PostStd(username: string, pass: string) {
  //   debugger;
  //   var dic1: Dictionary[] = [
  //     new Dictionary("name", username),
  //     new Dictionary("age", pass)

  //   ];

  //   return this._globalService.PostData('api/Test/PostStd', dic1);

  // }


}


export class Dictionary {

  public Key: string;
  public Value: string;
  constructor(private _key: string, private _value: string) {
    this.Key = this._key;
    this.Value = this._value;
  }
}


