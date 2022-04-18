import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { debounce, debounceTime, fromEvent, Observable, Subject } from 'rxjs';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  results: Observable<any>;
  subject = new Subject()

  summaryData: any[] = [];
  orgData: any[] = [];

  jobForm: FormGroup = new FormGroup({});

  currentSelectedJobId: any;

  constructor (private _jobServ: JobService, private _cookie: CookieService) { }

  ngOnInit (): void {
    if (this._cookie.check('user')) {
      let body = {
        UserId: this._cookie.get('user')
      }
      this._jobServ.getData(body).subscribe(res => {
        this.summaryData = res;
        this.orgData = res;
      });
      this.initJobForm();
    }
  }

  initJobForm (): void {
    this.jobForm = new FormGroup({
      applied: new FormControl(new Date(), [Validators.required]),
      name: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
    });
  }

  addJob (): void {
    let body = {
      UserId: this._cookie.get('user'),
      Applied: this.jobForm.controls['applied'].value,
      Name: this.jobForm.controls['name'].value,
      Link: this.jobForm.controls['link'].value,
    }
    this._jobServ.addJob(body).subscribe(res => {
      let item = {
        UserId: '625619ad5be3ba60d620c65c',
        Applied: this.jobForm.controls['applied'].value,
        Name: this.jobForm.controls['name'].value,
        Link: this.jobForm.controls['link'].value
      }
      this.summaryData.push(item);
      document.getElementById('closeModal')?.click();
      this.jobForm.reset();
    })
  }

  filterData (event) {
    let searchBox = document.getElementById('searchBox');
    fromEvent(searchBox, 'keyup').pipe(debounceTime(400)).subscribe(e => {
      if (event.target.value.length === 0) {
        this.summaryData = this.orgData;
      }
      else {
        this.summaryData = this.summaryData.filter(elem => {
          return elem.Name.toLowerCase().includes(event.target.value.toLowerCase());
        });
      }
    });
  }

  selectJob (id: any): void {
    this.currentSelectedJobId = id;
  }

  deleteJob (): void {
    let body = {};
    body['UserId'] = this.currentSelectedJobId;
    this._jobServ.deleteJob(body).subscribe(res => {
      this.summaryData = this.summaryData.filter(elem => {
        return elem.Id !== this.currentSelectedJobId;
      });
      document.getElementById('usercloseModal').click();
    });
  }
}
