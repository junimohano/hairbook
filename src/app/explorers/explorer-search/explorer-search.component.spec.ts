import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerSearchComponent } from './explorer-search.component';

describe('ExplorerSearchComponent', () => {
  let component: ExplorerSearchComponent;
  let fixture: ComponentFixture<ExplorerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
