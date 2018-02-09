import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';


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



    public  GetDataObservable(URL: string, params?: Dictionary[]): Observable<any> {
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
      debugger;
        URL = this.GetAPIURL() + URL;
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (URL.toLocaleLowerCase().includes("/api/log/post")) {
            return this._http.post(URL, params, options)
                .map(this.extractData);

        }
        else {
            this.turnOnModal();
            let request = this._http.post(URL, params, options)
                .map(this.extractData)
                .catch(this.handleError)
                .finally(() => this.turnOffModal());

            return this.intercept(request);
        }

    }



    private extractData(res: Response) {

        let body = res.json();
        return body;

    }

    public handleError(error: any) {

        // console.log('MyError:'+error);

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error('MyErrorMsg:' + errMsg);

        var dic1: Dictionary[] = [
            new Dictionary("Message", errMsg)
        ];


        if (error.stack) {
            let param2: Dictionary = new Dictionary("Stack", error.stack);
            dic1.push(param2);
        }
        let PostReturn: any;
        //  this.TestFun1();
        //   this.TestFun1();
        try {
            this.PostData('log/Post', dic1).subscribe(
                data => PostReturn = data);
        }
        catch (e) {
        }
        return Observable.throw(errMsg);
    }

    public turnOnModal() {
    }

    public turnOffModal(URL: string = '') {
        //execlude my tasks cause it runs in parallel with the rest of app
        // console.log("pendingRequestsDecrease:" + this.pendingRequests + ", "+ URL);
    }

    public GetAPIURL(): string {
       return  'http://localhost:50506/';
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
    public RemoveItemFromArray(arrObjects: any, ItemToRemove: any) {
        for (let item1 of arrObjects) {
            var itemFound = arrObjects.find((a: any) => a == ItemToRemove);
            if (itemFound != null) {

                var index = arrObjects.indexOf(itemFound, 0);
                if (index > -1) {
                    arrObjects.splice(index, 1);
                }
            }
        }
        return arrObjects;
    }
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

    public static GetDate(sDate: string): Date {
        var a = sDate.split(GlobalService.SplitDate);
        var ConvertedDate =
            new Date(parseInt(a[0]), parseInt(a[1]) - 1, parseInt(a[2]), parseInt(a[3]), parseInt(a[4]), parseInt(a[5]));
        return ConvertedDate;
    }


    // MyStrings
    public static GalleryFeedBackTypeID: string = '18';
    public static DiscussionTypeID: number = 28;
    public static VacationTypeID: number = 3;
    public static AnnouncementFeedBackTypeID: number = 13;

    public static VacationSteps_AddedNew = 29;
    public static VacationSteps_Updated = 30;
    public static VacationSteps_ReAssigned = 26;
    public static VacationSteps_ApprovedByHR = 25;
    public static VacationSteps_ApprovedByDirectManager = 24;

    public static CompensationSteps_HRAccept = 69;
    public static CompensationSteps_HRReject = 70;


    public static BalanceTypeStep_Pending = 284;
    public static BalanceTypeStep_Deleted = 287;


    public static AnnualLeave: number = 19;
    public static SickLeave: number = 22;
    public static AppURL = '/app/#/';
    public static SplitDate = /[^0-9]/;


    public static FillType_Subs = 'Subs';
    public static FillType_SubsAndCurrent = 'SubsAndCurrent';
    public static FillType_FillForRoleName = 'FillForRoleName';
    public static FillType_FillForRoleNameOrSubAll = 'FillForRoleNameOrSubAll';


    public static Roles_CompensationHR = 'CompensationHR';
    public static ResignAdmin = 'ResignAdmin';
    public static Roles_VACATIONsAdmin = 'VACATIONsAdmin';
    // public static Roles_DomainsAdmin = 'DomainsAdmin';
    public static TaskType_MyTasks = 'MyTasks';
    public static TaskType_MyManagerTasks = 'MyManagerTasks';
    public static TaskType_ManagerTasks = 'ManagerTasks';
    public static BusinessCardAdmin = 'BusinessCardAdmin';
    public static MsgType_Error = 'Error';
    public static MsgType_Success = 'Success';
    public static MsgType_Info = 'Info';
    public static MsgType_Warning = 'Warning';
    public static ApplicationsAdmin = 'ApplicationsAdmin';
    public static AnnouncementAdmin = 'AnnouncementAdmin';


    public static ExpensesPendingOnManager = 57;

    public static ViewType_Pending = "Pending";
    public static ViewType_HRTasks = "HRTasks";
    public static ViewType_ManagerTasks = "ManagerTasks";
    public static ViewType_MySubsView = "MySubsView";
    public static ViewType_MyRequests = "MyRequests";
    public static ViewType_Report = "Report";
    public static ViewType_ReportAll = "ReportAll";
    public static ViewType_ReportSick = "ReportSick";


    public static ActionName_Add = "Add";
    public static ActionName_Update = "Update";

    public static ActionName_Approve = "Approve";

    public static ActionName_Reject = "Reject";
    public static ActionName_ReAssign = "ReAssign";
    public static ActionName_Cancel = "Cancel";


    public static RangeLoad_CurrentMonth = 'CurrentMonth';
    public static RangeLoad_Past3Months = 'Past3Months';
    public static RangeLoad_PastYear = 'PastYear';
    public static RangeLoad_Past3Years = 'Past3Years';


    public static TransportationStepsAdded: string = '208';
    public static TransportationStepsAssignedToEmployee: string = '209';
    public static TransportationStepsFinished: string = '210';
    public static TransportationStepsDeleted: string = '211';

    public static VACATIONsReports: string = 'VACATIONsReports';
    public static RecruitmentAdmin: string = 'RecruitmentAdmin';




    public static TransportationAdmins = 'TransportationAdmins';
    public static MaintenanceRequest = 'MaintenanceRequest';
    public static MaintenanceWareHouse = 'MaintenanceWareHouse';
    public static MaintenanceSupplyChain = 'MaintenanceSupplyChain';
    public static MaintenanceBudget = 'MaintenanceBudget';
    public static MaintenanceFinance = 'MaintenanceFinance';

    public static WaitingforWarehousetoconfirm = 270;

    public static WaitingforCosting = 271;
    public static WaitingforManagerapproval = 272;
    public static Processing = 273;
    public static Senttobudget = 274;
    public static Senttofinance = 275;
    public static Rejected = 276;
    public static Finished = 277;
    public static Canceled = 278;
    public static WaitingforSupplyChainReleaseConfirmation = 279;
    public static WaitingforWarehousetoReleaseitems = 280;
    public static SupplyChainConfirmationVendorContact = 281;
    public static WaitingforWarehousetoCollecttheItems = 282;
    public static WaitingforSupplyChainRecieveConfirmation = 283;

    public static ExamTypeID = 62;


}
