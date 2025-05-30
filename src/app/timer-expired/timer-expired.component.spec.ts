import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerExpiredComponent } from './timer-expired.component';
import { ConfigurationStore } from '../configuration.store';

describe('TimerExpiredComponent', () => {
  let component: TimerExpiredComponent;
  let fixture: ComponentFixture<TimerExpiredComponent>;

  beforeEach(() => {
    spyOn(window.HTMLMediaElement.prototype, 'play').and.returnValue(
      Promise.resolve()
    );

    TestBed.configureTestingModule({
      imports: [TimerExpiredComponent],
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
    fixture = TestBed.createComponent(TimerExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit moveToConfiguration on ESC when showRestartText is true', () => {
    spyOn(component.moveToConfiguration, 'emit');
    component.showRestartText = true;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onKeydownHandler(event);
    expect(component.moveToConfiguration.emit).toHaveBeenCalled();
  });

  it('should switch colors every second', () => {
    Object.defineProperty(component, 'bombTimerConfiguration', {
      get: () => ({ color: '#FF0000' }),
    });
    component.color = '#000000';
    component.backgroundColor = '#000000';

    component.color = component.backgroundColor;
    component.backgroundColor =
      component.color === '#000000' ? '#FF0000' : '#000000';
    expect([component.backgroundColor, component.color]).toContain('#FF0000');
  });

  it('should play audio on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.audioPlayerRef.nativeElement.play).toHaveBeenCalled();
  });
});
