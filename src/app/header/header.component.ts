import { Component, OnInit } from '@angular/core';
import { faPlus, faPen, faTable, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../masterdata/articles/article.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  faTable = faTable;
  faUser = faUser;
  faPen = faPen;
  faShoppingCart = faShoppingCart
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
