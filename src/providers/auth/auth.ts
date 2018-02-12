import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthProvider {
  loader : any;
  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }


  login(){
    debugger;
    return new Promise((resolve)=>{

      setTimeout(() => {
        // debugger;
        if(localStorage.getItem("token" ) != null ){
          resolve(true);
        }else{
          resolve(false);
        }
        //  resolve(false);

      }, 3000);

    });


  }
}
