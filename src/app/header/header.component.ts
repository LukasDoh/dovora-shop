import { Component, OnInit } from '@angular/core';
import {
  faPlus,
  faPen,
  faTable,
  faUser,
  faShoppingCart,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../masterdata/articles/article.model';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faPlus = faPlus;
  faTable = faTable;
  faLogin = faSignInAlt;
  faUser = faUser;
  faPen = faPen;
  faShoppingCart = faShoppingCart;
  article = Article;
  isMenuCollapsed = true;
  closeResult = '';

  constructor(private modalService: NgbModal, private auth: AuthService, private router: Router) {}

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit(): void {}

  onLogin() {
    this.modalService.open(LoginComponent);
  }

  onLogout() {
  }
}
