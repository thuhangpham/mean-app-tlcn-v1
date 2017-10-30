import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/index';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    console.log('message alert ' + this.message);
    this.alertService.getMessage().subscribe((message) => {
      this.message = message;
      // console.log('getMessage().subscribe '+JSON.stringify(message));
    });
  }

}
