import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";

import { Role, Perm } from "../../../@types/auth";
import { AuthService } from "../../auth.service";

@Component({
  selector: "naval-role-perms",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: "./role-perms.component.html",
  styleUrl: "./role-perms.component.css"
})
export class RolePermsComponent {
  protected roles!: Role[];
  protected perms!: Perm[];

  constructor(private authService: AuthService) {}

  protected rolesAddForm = new FormGroup({
    role: new FormControl("")
  });

  protected rolesDeleteForm = new FormGroup({
    role: new FormControl("")
  });

  protected permsAddForm = new FormGroup({
    perm: new FormControl("")
  });

  protected permsDeleteForm = new FormGroup({
    perm: new FormControl("")
  });

  protected rolesPermsForm = new FormGroup({
    role: new FormControl(""),
    perm: new FormControl("")
  });

  ngOnInit() {
    this.authService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
    this.authService.getPerms().subscribe((perms) => {
      this.perms = perms;
    });
  }

  handleAddRole() {
    this.authService
      .createRole(this.rolesAddForm.value as Role)
      .subscribe((role) => {
        console.log("new role", role);
      });
  }

  handleDeleteRole() {
    this.authService
      .deleteRole(this.rolesDeleteForm.value as Role)
      .subscribe((role) => {
        console.log("deleted role", role);
      });
  }

  handleAddPerm() {
    this.authService
      .createPerm(this.permsAddForm.value as Perm)
      .subscribe((perm) => {
        console.log("new perm", perm);
      });
  }

  handleDeletePerm() {
    this.authService
      .deletePerm(this.permsDeleteForm.value as Perm)
      .subscribe((perm) => {
        console.log("deleted perm", perm);
      });
  }

  handleGrantPermToRole() {
    const { role, perm } = this.rolesPermsForm.value;
    if (role && perm) {
      this.authService.grantPermToRole(perm, role).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
