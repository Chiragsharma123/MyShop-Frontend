import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Products } from "../products/products";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ Products],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
