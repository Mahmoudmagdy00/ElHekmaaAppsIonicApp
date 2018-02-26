import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/Observable/throw';
import { HttpResponse } from "@angular/common/http/src/response";


export class Dictionary {

  public Key: string;
  public Value: string;
  constructor(private _key: string, private _value: string) {
    this.Key = this._key;
    this.Value = this._value;
  }
}
export class DictionaryObj {
  public Key: string;
  public Value: any;
  constructor(private _key: string, private _value: any) {
    this.Key = this._key;
    this.Value = this._value;
  }

}





@Injectable()
export class GlobalService {


  constructor(private _http: Http
  ) {

  }

  GetUserInfo() {
    debugger
    let headers = new Headers({
      'Content-Type': 'application/json',
      'withCredentials': 'true'
    });
    if (localStorage.getItem("token") != null) {
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    }

    return this._http.get(this.GetAPIURL() + 'api/Account/UserInfo', { headers: headers });
  }

  public GetDataObservable(URL: string, params?: Dictionary[]): Observable<any> {
    debugger;
    URL = this.GetAPIURL() + URL;
    //  console.log("pendingRequestsIncrease:" + this.pendingRequests + "," + URL);
    this.turnOnModal();
    if (params) {
      let SearchParams: URLSearchParams = new URLSearchParams();
      params.forEach((item, index) => {
        SearchParams.set(item.Key, item.Value);
      });

      let request = this._http.get(URL, {
        search: SearchParams
      })
        .map(this.extractData)
        .catch(this.handleError)
        .finally(() => this.turnOffModal(URL));
      //   .finally(this.turnOffModal);
      return this.intercept(request);

    }
    else {
      let request =
        this._http.get(URL)

          .map(this.extractData)

          .catch(this.handleError)
          .finally(() => this.turnOffModal(URL));
      //.finally(this.turnOffModal);
      return this.intercept(request);

    }
  }

  public static convertDate(date: Date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var HH = date.getHours().toString();
    var min = date.getMinutes().toString();
    var ss = date.getSeconds().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]) + ' ' + HH + ':' + min + ':' + ss;
  }

  public PostData(URL: string, params: any) {
    //debugger;
    URL = this.GetAPIURL() + URL;
    console.log(URL);
    // let headers = new Headers({ 'Content-Type': 'application/json;application/x-www-form-urlencoded;charset=utf-8', 'Accept': 'application/json' });
    let headers = null;
    if (URL.toLocaleLowerCase().includes("/token") || URL.toLocaleLowerCase().includes("api/account/register"))
      headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', 'Accept': 'application/json' });
    else
      headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

    let options = new RequestOptions({ headers: headers });

    // if (URL.toLocaleLowerCase().includes("/api/log/post")) {
    //   return this._http.post(URL, params, options)
    //     .map(this.extractData);

    // }
    // else {
    this.turnOnModal();
    let request = this._http.post(URL, params, options)
      .map(this.extractData)
      .catch(this.handleError)
      .finally(() => this.turnOffModal());

    return this.intercept(request);
    // }

  }



  private extractData(res: Response) {
    debugger;
    let body;
    try {
      body = res.json();

    } catch (e) {
      return res;
    }
    return body;


  }


  public handleError(error: HttpResponse<any>) {
    // debugger;
    // let errMsg: string;
    // if (error instanceof Response) {
    //     const body = error.json() || '';
    //     const err = body.error || JSON.stringify(body);
    //     errMsg =  `${err}`;

    // } else {
    //     errMsg = error.message ? error.message : error.toString();
    // }
    console.log(error);
    return Observable.throw(error.body || "Server Error");
  }

  public turnOnModal() {
  }

  public turnOffModal(URL: string = '') {
    //execlude my tasks cause it runs in parallel with the rest of app
    // console.log("pendingRequestsDecrease:" + this.pendingRequests + ", "+ URL);
  }

  public GetAPIURL(): string {
    return 'http://localhost:50505/';
  }



  public GetRelativeURL(): string {
    // if (MyAppEnv == 'development') {

    // if (MyEnv === 'production') {
    return '#/';
    //}
    //else {
    //    return '/';
    //}
    //   return '#/';
  }
  public static IsNullOrEmpty(data: any): boolean {
    if (data == null || data == undefined || data == '')
      return true;
    else return false;
  }

  private intercept(observable: Observable<any>): Observable<any> {
    debugger;
    observable.map(r => {
      this.turnOffModal('');
      return r;
    });
    return observable;
  }


  public get(url: string): Observable<any> {
    let request = this.get(url)
      .catch(this.handleError)
      .finally(() => this.turnOffModal(url));

    return this.intercept(request);
  }
  // public RemoveItemFromArray(arrObjects: any, ItemToRemove: any) {
  //     for (let item1 of arrObjects) {
  //         var itemFound = arrObjects.find((a: any) => a == ItemToRemove);
  //         if (itemFound != null) {

  //             var index = arrObjects.indexOf(itemFound, 0);
  //             if (index > -1) {
  //                 arrObjects.splice(index, 1);
  //             }
  //         }
  //     }
  //     return arrObjects;
  // }
  GetFileString(fileList: FileList, callback: any) {
    //   debugger;
    if (fileList != null && fileList.length > 0) {
      let file: File = fileList[0];



      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {

        // console.log(reader.result);
        var ext = file.name.split('.').pop();
        callback(new Dictionary(ext, reader.result));
        //return new Dictionary(ext, reader.result);
      };







      //let formData: FormData = new FormData();
      //formData.append('uploadFile', file, file.name);
      //let headers = new Headers();
      ////  headers.append('Content-Type', 'multipart/form-data');
      //headers.append('Accept', 'application/json');
      //let options = new RequestOptions({ headers: headers });

      //this._http.post(this.GetAPIURL() + 'General/UploadFile?ItemID=' + ItemID, formData, options)
      //    .map(res => res.json())
      //    .catch(error => Observable.throw(error))
      //    .subscribe(
      //    data => console.log('success'),
      //    error => console.log(error)
      //    )
    }
    //else {
    //    return new Dictionary('', '');
    //}
  }


  public IsSafari() {
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      return true
    }
    else return false;
  }

  /**
* detect IE
* returns version of IE or false, if browser is not Internet Explorer
*/
  public detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // IE 12 / Spartan
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge (IE 12+)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      var rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return 0;
  }
  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }




}

export interface UserInfoViewModel
{

    UserID : string;
}
