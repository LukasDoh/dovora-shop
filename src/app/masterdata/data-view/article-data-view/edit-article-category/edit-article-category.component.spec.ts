import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticleCategoryComponent } from './edit-article-category.component';

describe('EditArticleCategoryComponent', () => {
  let component: EditArticleCategoryComponent;
  let fixture: ComponentFixture<EditArticleCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArticleCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
