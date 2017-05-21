import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndeployActionComponent } from './undeploy-action.component';

describe('UndeployActionComponent', () => {
  let component: UndeployActionComponent;
  let fixture: ComponentFixture<UndeployActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeployActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeployActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
