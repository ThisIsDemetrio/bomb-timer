import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerExpiredComponent } from './timer-expired.component';

describe('TimerExpiredComponent', () => {
  let component: TimerExpiredComponent;
  let fixture: ComponentFixture<TimerExpiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerExpiredComponent]
    });
    fixture = TestBed.createComponent(TimerExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
