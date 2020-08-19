import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
})
export class DataViewComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  checkRoute(identifier: string) {
    return this.router.url === identifier;
  }
}
