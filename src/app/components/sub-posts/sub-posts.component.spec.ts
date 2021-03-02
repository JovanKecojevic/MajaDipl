import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPostsComponent } from './sub-posts.component';

describe('SubPostsComponent', () => {
  let component: SubPostsComponent;
  let fixture: ComponentFixture<SubPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
