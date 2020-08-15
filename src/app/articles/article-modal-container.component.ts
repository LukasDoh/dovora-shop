import { Component, OnDestroy, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddArticleComponent } from './add-article/add-article.component';

@Component({
  selector: 'article-modal-container',
  template: '',
})
export class ArticleModalContainer implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog = null;

  constructor(
    private modalService: NgbModal,
    route: ActivatedRoute,
    router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
      // When the router navigates to this component it takes the params and opens up the add Article Modal
      console.log(params);
      if (params.operation === 'add') {
        this.currentDialog = this.modalService.open(AddArticleComponent);
      } else if (params.operation === 'close') {
        router.navigateByUrl('/');
      } else {
        router.navigateByUrl('/');
      }

      // Return to home page when modal is closed
      this.currentDialog.result.then(
        (result) => {
          router.navigateByUrl('/');
        },
        (reason) => {
          router.navigateByUrl('/');
        }
      );
    });
  }

  ngOnDestroy() {
    this.destroy.next();
  }
}
