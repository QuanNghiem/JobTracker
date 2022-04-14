import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {



  constructor (private _client: HttpClient) {

  }

  getData () {
    let url = 'https://localhost:7121/api/allJobs';
    return this._client.get<any | any[]>(url);
    // .subscribe(res => {
    //   console.log(res);
    // });
  }
}
