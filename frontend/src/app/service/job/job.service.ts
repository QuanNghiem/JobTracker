import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  url = 'https://q-jobtrackerapi.azurewebsites.net/api';

  constructor (private _client: HttpClient) {

  }

  getData (body: any) {
    return this._client.post<any | any[]>(this.url + '/userJobs', body);
  }

  addJob (body: any) {
    return this._client.post(this.url + '/addJob', body);
  }

  deleteJob (body: any) {
    return this._client.post(this.url + '/deleteJob', body);
  }
}
