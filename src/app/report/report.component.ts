import { Component, OnInit } from '@angular/core';

import { Report } from '../report';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  report: Report[];
  reports: any;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.generateReport();
    this.getReport();
  }

  generateReport(): void{
    this.reportService.generateReport()
    .subscribe(report => this.reports = report);
  }

  getReport(): void{
    const id = localStorage.getItem('id');
    this.reportService.getReportById(id)
    .subscribe(report => this.report = report);
  }

  downloadReport(): void{
    this.reportService.downloadReport();
  }

  headElements = ['ID', 'Sales Name','Branch','Nolang','Customer Name','Customer Address','Contact Person','Customer Contact','Product Code',
                  'Product Name','Proposed Price','Quantity','Accepted','Recommended Price','Status',
                  'Created at','Updated at'];
}
