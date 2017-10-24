import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet, Routes} from '@angular/router';
import {Tab} from '../../_models/tab';
import {TabService} from '../../_services/tab.service';
import { TablinkComponent } from '../tablink/tablink.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  tabs: Tab[];
  constructor(private _tabService: TabService, private router: Router) { }

  ngOnInit() {
    this._tabService.getTabs().then((tabs: Tab[]) => {
      this.tabs = tabs;
      console.log(this.tabs);
    });
    this.router.navigate(['tabs', {id: 1}]);
  }
  selectTab(tab: Tab){
    console.log(tab);
    // deactivate all tabs
    this.tabs.forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;

  }
}
