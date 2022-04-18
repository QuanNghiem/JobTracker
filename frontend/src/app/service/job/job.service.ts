import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor (private _client: HttpClient) {

  }

  getData (body: any) {
    let url = 'https://localhost:7121/api/userJobs';
    return this._client.post<any | any[]>(url, body);
  }

  addJob (body: any) {
    let url = 'https://localhost:7121/api/addJob';
    return this._client.post(url, body);
  }

  deleteJob (body: any) {
    let url = 'https://localhost:7121/api/deleteJob';
    return this._client.post(url, body);
  }
}
