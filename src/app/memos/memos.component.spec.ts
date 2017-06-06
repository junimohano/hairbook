import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemosComponent } from './memos.component';

describe('MemosComponent', () => {
  let component: MemosComponent;
  let fixture: ComponentFixture<MemosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
