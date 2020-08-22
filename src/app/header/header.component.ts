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
import { TokenStorageService } from '../_services/token-storage.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../_services/shopping-cart.service';
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
  currentUser: any = null;
  subscription: Subscription;
  cartItems: Article[] = [];

  constructor(
    private modalService: NgbModal,
    private auth: AuthService,
    private router: Router,
    private tokenService: TokenStorageService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.subscription = this.cartService.itemsChanged.subscribe(
      (items: Article[]) => {
        this.cartItems = items;
      }
    );
    this.cartItems = this.cartService.getItems();
  }

  open(content) {
    this.modalService.open(content);
  }

  onLogin() {
    this.modalService.open(LoginComponent);
  }

  onLogout() {
    this.tokenService.signOut();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  hasRole(role: string, otherrole = null) {
    if (this.currentUser) {
      if (this.currentUser.roles.indexOf(role) > -1) {
        return true;
      } else if (otherrole != null) {
        if (this.currentUser.roles.indexOf(otherrole) > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
