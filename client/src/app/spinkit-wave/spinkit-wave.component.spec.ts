import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinkitWaveComponent } from './spinkit-wave.component';

describe('SpinkitWaveComponent', () => {
  let component: SpinkitWaveComponent;
  let fixture: ComponentFixture<SpinkitWaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinkitWaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinkitWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
