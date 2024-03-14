import { TestBed, type ComponentFixture } from '@angular/core/testing';

import { input } from '@angular/core';
import { TimestampComponent } from './timestamp.component';

describe('TimestampComponent', () => {
  let component: TimestampComponent;
  let fixture: ComponentFixture<TimestampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimestampComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimestampComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display just now', () => {
    changeCreatedAtTo(now().getTime());
    expectElapsedTimeTextIs('just now');
  });

  it('should display 6 minutes ago', () => {
    changeCreatedAtTo(now().setMinutes(new Date().getMinutes() - 6));
    expectElapsedTimeTextIs('6 minutes ago');
  });

  function now() {
    return new Date();
  }

  function changeCreatedAtTo(dateTime: number) {
    component.createdAt = input(dateTime);
    fixture.detectChanges();
  }

  function expectElapsedTimeTextIs(expectedElapsedTime: string) {
    const timeElement: HTMLTimeElement = fixture.nativeElement;
    expect(timeElement.textContent).toEqual(expectedElapsedTime);
  }
});
