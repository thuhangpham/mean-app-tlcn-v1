import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VerifyService } from '../../_services/verify.service';
import { Router } from '@angular/router';
import { Tab } from '../../_models/tab';
import { AboutComponent } from '../about/about.component';
import { AccountComponent } from '../account/account.component';
import { SecurityComponent } from '../security/security.component';
import { ContactComponent } from '../contact/contact.component';
import { InfoComponent } from '../info/info.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  image: any;
  username: any;
  tabs: Tab[];
  constructor(private titleService: Title,
    private verifyService: VerifyService,
    private router: Router,
    private infoComponent: InfoComponent,
    private contactComponent: ContactComponent,
    private aboutComonent: AboutComponent,
    private accountComponent: AccountComponent,
    private securityComponent: SecurityComponent) {
    verifyService.verify().then(res => {
      if (res.result === 0) {
        this.router.navigate(['/']);
      }
    })
      .catch(err => {
        this.router.navigate(['/']);
        Promise.reject('');
      });

    let currUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.titleService.setTitle(currUser.info.fullname);
    this.image = currUser.image;
    this.username = currUser.info.fullname;
  }

  ngOnInit() {
    this.tabs = [new Tab(0, 'Info', 'info', this.infoComponent)
      , new Tab(1, 'Contact', 'contact', this.contactComponent)
      , new Tab(2, 'About', 'about', this.aboutComonent)
      , new Tab(3, 'Security', 'security', this.securityComponent)];
    this.tabs.forEach(t => {
      t.active = false;
      if (window.location.pathname === '/profile/' + t.link || this.router.url === '/profile/' + t.link)
        t.active = true;
    });

  }
  tabClick(tab: Tab) {
    this.tabs.forEach(t => {
      t.active = false;
    });
    tab.active = true;
  }

}
