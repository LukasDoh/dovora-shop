import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDataViewComponent } from './article-data-view.component';

describe('ArticleDataViewComponent', () => {
  let component: ArticleDataViewComponent;
  let fixture: ComponentFixture<ArticleDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
