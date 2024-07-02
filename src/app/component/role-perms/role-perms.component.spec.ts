import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePermsComponent } from './role-perms.component';

describe('RolePermsComponent', () => {
  let component: RolePermsComponent;
  let fixture: ComponentFixture<RolePermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolePermsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolePermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
