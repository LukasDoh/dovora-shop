import { Component, OnInit } from '@angular/core';

/**
 * Home component: Content part of page. Displays 
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content: string;

  constructor() {}

  ngOnInit(): void {}
}
