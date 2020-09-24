import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './_services/data-storage.service';

/**
 * App Component: Root Component
 * @author Lukas Dohmeier <lukas.dohmeier@edu.fhdw.de>
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dovora-shop';

  constructor(private dataService: DataStorageService) {}

  /**
   * on init: fetches all articles and categories from api and subscribes to it.
   */
  ngOnInit() {
    this.dataService.fetchArticles().subscribe();
    this.dataService.fetchCategories().subscribe();
  }
}
