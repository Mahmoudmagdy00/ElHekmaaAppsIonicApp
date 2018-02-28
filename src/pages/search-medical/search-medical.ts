import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchMedicalService, OrderRequest } from '../../shared/shared';


@IonicPage()
@Component({
  selector: 'page-search-medical',
  templateUrl: 'search-medical.html',
  providers: [SearchMedicalService]
})
export class SearchMedicalPage {
  OrderRequest: OrderRequest = new OrderRequest();
  constructor(public navCtrl: NavController, public navParams: NavParams, private _search: SearchMedicalService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchMedicalPage');
  }


  submitForm() {
    if(localStorage.getItem("userid" ) != null ){
      this._search.PostOrder(this.OrderRequest.sComment, false, this.OrderRequest.sName, this.OrderRequest.sIsProposals).
      subscribe(data => {
        console.log(data);
      },error => {
        console.log(error);
      });


    }else{

    }

  }



}
