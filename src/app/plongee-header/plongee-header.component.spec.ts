import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlongeeHeaderComponent } from './plongee-header.component';

describe('PlongeeHeaderComponent', () => {
  let component: PlongeeHeaderComponent;
  let fixture: ComponentFixture<PlongeeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlongeeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlongeeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
