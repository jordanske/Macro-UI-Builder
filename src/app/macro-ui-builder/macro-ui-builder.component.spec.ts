import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroUiBuilderComponent } from './macro-ui-builder.component';

describe('MacroUiBuilderComponent', () => {
  let component: MacroUiBuilderComponent;
  let fixture: ComponentFixture<MacroUiBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MacroUiBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroUiBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
