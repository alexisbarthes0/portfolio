import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlongeeDataComponent } from './plongee-data.component';

describe('PlongeeDataComponent', () => {
  let component: PlongeeDataComponent;
  let fixture: ComponentFixture<PlongeeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlongeeDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlongeeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
