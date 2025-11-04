import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlongeeFrontComponent } from './plongee-front.component';

describe('PlongeeFrontComponent', () => {
  let component: PlongeeFrontComponent;
  let fixture: ComponentFixture<PlongeeFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlongeeFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlongeeFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
