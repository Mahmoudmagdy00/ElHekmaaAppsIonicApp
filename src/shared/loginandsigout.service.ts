
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
@Injectable()

export class loginandsigoutService {



  constructor(private _globalService: GlobalService) {

  }



  PostSignOut(data : any) {
     debugger;
    // var dic1: Dictionary[] = [
    //   new Dictionary("Email", username),
    //   new Dictionary("Password", pass),
    //   new Dictionary("ConfirmPassword", confpass),

    // ];

    // var data = "grant_type=password&username=" +  username + "&password=" + pass;
    return this._globalService.PostData('api/Account/Register', JSON.stringify(data));
  }


  PostLogin(username: string, pass: string) {
    var data = "grant_type=password&username=" +  username + "&password=" + pass;
    return this._globalService.PostData('token', data);
  }

}
export class regData
{
  public Email:string;
  public assword:string;
  public ConfirmPassword: string;
}




