import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgAddComponent } from './org-add.component';

describe('OrgAddComponent', () => {
  let component: OrgAddComponent;
  let fixture: ComponentFixture<OrgAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
