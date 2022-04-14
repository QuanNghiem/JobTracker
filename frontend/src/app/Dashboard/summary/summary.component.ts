import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  summaryData: any | any[] = null;

  constructor (private _jobServ: JobService) { }

  ngOnInit (): void {
    this._jobServ.getData().subscribe(res => {
      this.summaryData = res;
    });
  }


}
