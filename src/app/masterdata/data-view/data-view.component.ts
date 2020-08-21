import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/_services/data-storage.service';

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
})
export class DataViewComponent implements OnInit {
  constructor(private router: Router, private dataService: DataStorageService) {}

  ngOnInit(): void {
    this.dataService.fetchCategories().subscribe();
    this.dataService.fetchCustomers().subscribe();
  }

  checkRoute(identifier: string) {
    return this.router.url === identifier;
  }
}
