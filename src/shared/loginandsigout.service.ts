
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
@Injectable()

export class loginandsigoutService {



  constructor(private _globalService: GlobalService) {

  }




  PostSignOut(data: any) {
    var dataText = "PhoneNumber=" + data['Email'] + "&Password=" + data['Password'] + "&ConfirmPassword=" + data['ConfirmPassword'] ;
    return this._globalService.PostData('api/Account/Register',dataText);
  }


  PostLogin(username: string, pass: string) {
    var data = "grant_type=password&username=" + username + "&password=" + pass;
    return this._globalService.PostData('token', data);
  }

}
export class regData {
  public Email: string;
  public Password: string;
  public ConfirmPassword: string;
}

export class loginModel
{
  public UserName : string;
  public Password : string;
}




