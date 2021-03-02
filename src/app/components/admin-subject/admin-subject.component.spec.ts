import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubjectComponent } from './admin-subject.component';

describe('AdminSubjectComponent', () => {
  let component: AdminSubjectComponent;
  let fixture: ComponentFixture<AdminSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
