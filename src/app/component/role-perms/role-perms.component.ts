import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Role, Perm } from '../../../@types/auth';
import { AuthService } from '../../auth.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'naval-role-perms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './role-perms.component.html',
  styleUrl: './role-perms.component.css'
})
export class RolePermsComponent {
  protected roles!: Role[];
  protected perms!: Perm[];

  constructor(private authService: AuthService) {}

  protected rolesAddForm = new FormGroup({
    role: new FormControl(""),
  });

  protected rolesDeleteForm = new FormGroup({
    role: new FormControl(""),
  });

  protected permsAddForm = new FormGroup({
    perm: new FormControl(""),
  });

  protected permsDeleteForm = new FormGroup({
    perm: new FormControl(""),
  });

  ngOnInit() {
    this.authService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.authService.getPerms().subscribe(perms => {
      this.perms = perms;
    });
  }

  handleAddRole(event: Event) {
    event.preventDefault();
    this.authService.createRole(this.rolesAddForm.value as Role).subscribe((role) => {
      console.log("new role", role);
    });
  }

  handleDeleteRole(event: Event) {
    event.preventDefault();
    this.authService.deleteRole(this.rolesDeleteForm.value as Role).subscribe((role) => {
      console.log("deleted role", role);
    });
  }

  handleAddPerm(event: Event) {
    event.preventDefault();
    this.authService.createPerm(this.permsAddForm.value as Perm).subscribe((perm) => {
      console.log("new perm", perm);
    });
  }

  handleDeletePerm(event: Event) {
    event.preventDefault();
    this.authService.deletePerm(this.permsDeleteForm.value as Perm).subscribe((perm) => {
      console.log("deleted perm", perm);
    });
  }
}
