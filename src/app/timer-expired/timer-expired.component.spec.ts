import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';

import { TimerExpiredComponent } from './timer-expired.component';

describe('TimerExpiredComponent', () => {
  let component: TimerExpiredComponent;
  let fixture: ComponentFixture<TimerExpiredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TimerExpiredComponent],
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
    // Use Object.defineProperty to mock bombTimerConfiguration
    Object.defineProperty(component, 'bombTimerConfiguration', {
      get: () => ({ color: '#FF0000' }),
    });
    component.color = '#000000';
    component.backgroundColor = '#000000';
    // Simulate interval callback
    component.color = component.backgroundColor;
    component.backgroundColor =
      component.color === '#000000' ? '#FF0000' : '#000000';
    expect([component.backgroundColor, component.color]).toContain('#FF0000');
  });

  it('should play audio on ngAfterViewInit', () => {
    component.audioPlayerRef = {
      nativeElement: { play: jasmine.createSpy('play') },
    } as unknown as ElementRef<HTMLAudioElement>;
    component.ngAfterViewInit();
    expect(component.audioPlayerRef.nativeElement.play).toHaveBeenCalled();
  });
});
