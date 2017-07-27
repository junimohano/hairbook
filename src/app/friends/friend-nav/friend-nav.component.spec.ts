import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendNavComponent } from './friend-nav.component';

describe('FriendNavComponent', () => {
  let component: FriendNavComponent;
  let fixture: ComponentFixture<FriendNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
