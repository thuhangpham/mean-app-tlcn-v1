import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core'
import { Tab } from '../../_models/tab';
import { RouterLink } from '@angular/router';

import $ from "jquery";
@Component({
  selector: 'app-tablink',
  inputs: ['tab'],
  templateUrl: './tablink.component.html',
  styleUrls: ['./tablink.component.css']
})
export class TablinkComponent implements OnInit {
  tab: Tab;
  private _observer: MutationObserver;
  constructor(private _el: ElementRef) {
  }
  ngOnInit(){}

}
