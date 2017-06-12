import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorersComponent } from './explorers.component';

describe('ExplorersComponent', () => {
  let component: ExplorersComponent;
  let fixture: ComponentFixture<ExplorersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
