import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombTimerComponent } from './bomb-timer.component';

describe('BombTimerComponent', () => {
  let component: BombTimerComponent;
  let fixture: ComponentFixture<BombTimerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BombTimerComponent],
    });
    fixture = TestBed.createComponent(BombTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
