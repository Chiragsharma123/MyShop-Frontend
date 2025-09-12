import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faSearch , faUserCircle , faShoppingCart , faMoon ,faSun , faHome , faSignOutAlt} from "@fortawesome/free-solid-svg-icons"
import { NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Login } from '../login/login';
import { Auth as authService } from '../../service/auth';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, NgIf,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  faSearch = faSearch;
  faUser = faUserCircle;
  faCart = faShoppingCart;
  faMoon = faMoon;
  faSun = faSun;
  faHome = faHome;
  DarkMode = false;
  isLoggedIn = false;
  falogout = faSignOutAlt;
  userName!: string;

  constructor(private authService : authService){}


  ngOnInit():void{
    this.authService.isLoggedIn$.subscribe(status=>{
      this.isLoggedIn=status;
    })
    this.authService.userData$.subscribe(data=>
    {
      this.userName = data;
      console.log(this.userName , "username")
    }
    )
  }

  toggleDarkMode() {
    console.log('Dark mode:', this.DarkMode);
    this.DarkMode = !this.DarkMode;
      console.log('Dark mode:', this.DarkMode);
    if(this.DarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  logOut(){
    this.authService.logout();
  }
}