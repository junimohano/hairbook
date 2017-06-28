import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListAllComponent } from './post-list-all.component';

describe('PostListAllComponent', () => {
  let component: PostListAllComponent;
  let fixture: ComponentFixture<PostListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
