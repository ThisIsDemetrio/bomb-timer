import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BombTimerState } from './types';
import { ConfigurationComponent } from './configuration/configuration.component';
import { BombTimerComponent } from './bomb-timer/bomb-timer.component';
import { TimerExpiredComponent } from './timer-expired/timer-expired.component';
import { ConfigurationStore } from './configuration.store';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        ConfigurationComponent,
        BombTimerComponent,
        TimerExpiredComponent,
      ],
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
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should start in CONFIGURATION state', () => {
    expect(app.state).toBe(BombTimerState.CONFIGURATION);
  });

  it('should move to TIMER_RUNNING after configuration completed', () => {
    app.onConfigurationCompleted({
      hours: '00',
      minutes: '01',
      color: '#FF0000',
      showMilliseconds: false,
    });
    expect(app.state).toBe(BombTimerState.TIMER_RUNNING);
  });

  it('should move to TIMER_EXPIRED after countdown completed', () => {
    app.onCountdownCompleted();
    expect(app.state).toBe(BombTimerState.TIMER_EXPIRED);
  });

  it('should return to CONFIGURATION after moveToConfiguration', () => {
    app.state = BombTimerState.TIMER_EXPIRED;
    app.onMoveToConfiguration();
    expect(app.state).toBe(BombTimerState.CONFIGURATION);
  });
});
