import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFAComponent } from './second-fa.component';

describe('SecondFAComponent', () => {
  let component: SecondFAComponent;
  let fixture: ComponentFixture<SecondFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondFAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
