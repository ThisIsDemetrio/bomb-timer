import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationComponent } from './configuration.component';
import { ConfigurationStore } from '../configuration.store';

describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigurationComponent],
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
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit configurationCompleted with valid options', () => {
    spyOn(component.configurationCompleted, 'emit');
    component.configuration.hours = '01';
    component.configuration.minutes = '10';
    component.configuration.color = '#FF0000';
    component.configuration.showMilliseconds = true;
    component.submitConfiguration();
    expect(component.configurationCompleted.emit).toHaveBeenCalledWith({
      hours: '01',
      minutes: '10',
      color: '#FF0000',
      showMilliseconds: true,
    });
  });

  it('should validate configuration correctly', () => {
    component.configuration.hours = '00';
    component.configuration.minutes = '00';
    expect(component.isConfigurationValid()).toBeFalse();
    component.configuration.hours = '01';
    expect(component.isConfigurationValid()).toBeTrue();
  });
});
