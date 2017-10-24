import {Injectable} from '@angular/core';
import {Tab} from '../_models/tab';

@Injectable()
export class TabService {
  
  private static _tabs: Tab[] = [new Tab(1, "Info", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut."), 
                                     new Tab(2, "Address", "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")];
                                            
  getTabs(): Promise<Array<Tab>> {
    return new Promise<Array<Tab>>((resolve, reject) => {
      resolve(TabService._tabs);
    });  
  }                                        
  
  getTab(id:Number): Promise<Tab> {

    let tab: Tab;
    for (let i=0;i<TabService._tabs.length; i++) {
      if (TabService._tabs[i].id === id) {
        tab = TabService._tabs[i];
        break;
      }
    }
    return new Promise<Tab>((resolve, reject) => {
      resolve(tab);  
    });
    
  }
  

  
  addTab(tab: Tab): Promise<Array<Tab>> {
    if (tab && tab.id === -1) {
      tab.id = TabService._tabs.length + 1;
      TabService._tabs.unshift(tab);
    }
    return new Promise<Array<Tab>>((resolve, reject) => {
      resolve(TabService._tabs);
    });
  }
  
}