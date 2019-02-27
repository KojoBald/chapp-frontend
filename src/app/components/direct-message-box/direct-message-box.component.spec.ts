import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessageBoxComponent } from './direct-message-box.component';

describe('DirectMessageBoxComponent', () => {
  let component: DirectMessageBoxComponent;
  let fixture: ComponentFixture<DirectMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
