import { Component, OnInit } from '@angular/core';
import { Users } from '../../_models/users';
import { UsersService } from '../../_services/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUsers : Users;
  users : Users[] = [];

  constructor(private usersService: UsersService) { 
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  loadAllUsers(){
    this.usersService.getAll().then((data)=>{
      this.users = data;
    }).catch((err)=>{
      console.log("Error " + err);
    });
  }

}
