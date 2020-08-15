import { Component, OnInit } from '@angular/core';
import { faSave }from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  faSave = faSave;

  constructor() { }

  ngOnInit(): void {
  }
}
