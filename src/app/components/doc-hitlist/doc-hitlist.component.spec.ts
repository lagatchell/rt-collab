import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocHitlistComponent } from './doc-hitlist.component';

describe('DocHitlistComponent', () => {
  let component: DocHitlistComponent;
  let fixture: ComponentFixture<DocHitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocHitlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocHitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
