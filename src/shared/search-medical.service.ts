import { Injectable } from '@angular/core';
import{Http } from '@angular/http'
@Injectable()


export class SearchMedicalService{
  private baseUrl = 'https://jsonplaceholder.typicode.com/photos';
  constructor(private _http : Http){

  }

  GetPhotos(){
    return new Promise(resolve=>{
        this._http.get(`${this.baseUrl}`).subscribe(res =>resolve(res.json()));
    });
  }
}
