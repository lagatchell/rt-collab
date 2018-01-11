import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocThreadComponent } from './doc-thread.component';

describe('DocThreadComponent', () => {
  let component: DocThreadComponent;
  let fixture: ComponentFixture<DocThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
