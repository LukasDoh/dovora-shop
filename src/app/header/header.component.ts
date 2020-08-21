import { Component, OnInit } from '@angular/core';
import { faPlus, faPen, faTable, faUser, faShoppingCart, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../masterdata/articles/article.model'
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  faTable = faTable;
  faLogin = faSignInAlt;
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

  onLogin() {
    this.modalService.open(LoginComponent);
  }

}
