import { Component, OnInit } from '@angular/core';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faSave }from '@fortawesome/free-regular-svg-icons'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../articles/article.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  faTimes = faTimes;
  faSave = faSave;
  article = Article;
  isMenuCollapsed = true;
  closeResult = '';

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content)
  }

  ngOnInit(): void {
  }

}
