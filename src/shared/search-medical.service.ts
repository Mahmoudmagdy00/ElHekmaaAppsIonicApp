
import { Injectable } from '@angular/core';
import { GlobalService , Dictionary } from './global.service';
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



  GetData() {
    return this._globalService.GetDataObservable('api/Test/GetStd');
  }

  PostOrder(sComment: string, sIsAttach: boolean ,sName : string , sIsProposals : boolean ) {
    debugger;
    var dic1: Dictionary[] = [
      new Dictionary("sComment", sComment),
      new Dictionary("sIsAttach", sIsAttach.toString()),
      new Dictionary("sName", sName),
      new Dictionary("sIsProposals", sIsProposals.toString()),
      new Dictionary("sUserID" , localStorage.getItem("userid" ))

    ];

    return this._globalService.PostData('api/Order/Post', dic1);

  }
  PostOrderTest(order : OrderRequest ) {


    return this._globalService.PostData('api/Order/Post', JSON.stringify(order));

  }


}

export class OrderRequest{
  public sComment :string;
  public sIsAttach : boolean;
  public sName : string;
  public sIsProposals : boolean;
}




