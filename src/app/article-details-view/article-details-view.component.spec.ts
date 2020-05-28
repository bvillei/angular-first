import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailsViewComponent } from './article-details-view.component';

describe('ArticleDetailsViewComponent', () => {
  let component: ArticleDetailsViewComponent;
  let fixture: ComponentFixture<ArticleDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
