import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SVGIconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: SVGIconComponent;
  let fixture: ComponentFixture<SVGIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SVGIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SVGIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
