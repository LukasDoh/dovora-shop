import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCategoryDataViewComponent } from './article-category-data-view.component';

describe('ArticleCategoryDataViewComponent', () => {
  let component: ArticleCategoryDataViewComponent;
  let fixture: ComponentFixture<ArticleCategoryDataViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCategoryDataViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCategoryDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
