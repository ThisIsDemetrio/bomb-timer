import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombTimerComponent } from './bomb-timer.component';
import { ConfigurationStore } from '../configuration.store';

describe('BombTimerComponent', () => {
  let component: BombTimerComponent;
  let fixture: ComponentFixture<BombTimerComponent>;

  beforeEach(() => {
    spyOn(window.HTMLMediaElement.prototype, 'play').and.returnValue(
      Promise.resolve()
    );

    TestBed.configureTestingModule({
      imports: [BombTimerComponent],
      providers: [
        {
          provide: ConfigurationStore,
          useValue: {
            configuration: () => ({
              hours: '00',
              minutes: '01',
              color: '#FF0000',
              showMilliseconds: false,
            }),
            setConfiguration: jasmine.createSpy('setConfiguration'),
            reset: jasmine.createSpy('reset'),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(BombTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the timer and emit countdownCompleted on complete', done => {
    spyOn(component.countdownCompleted, 'emit');
    component.endDate = new Date(Date.now() + 100);
    component.ngOnInit();
    setTimeout(() => {
      expect(component.countdownCompleted.emit).toHaveBeenCalled();
      done();
    }, 200);
  });

  it('should emit countdownCanceled on ESC when warning is shown', () => {
    spyOn(component.countdownCanceled, 'emit');
    component.showCancelWarning = true;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onKeydownHandler(event);
    expect(component.countdownCanceled.emit).toHaveBeenCalled();
  });
});
