import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { forkJoin } from "rxjs";
import _ from "lodash";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { Org, OrgId, Role, User } from "../../../@types/auth";
import { AuthService } from "../../auth.service";

@Component({
  selector: "naval-org-details",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  templateUrl: "./org-details.component.html",
  styleUrl: "./org-details.component.css"
})
export class OrgDetailsComponent {
  protected org!: Org;
  protected roles!: Role[];
  protected rolesAvailables!: string[];
  protected users!: User[];
  protected enrolledUsers: User[] = [];
  protected enrolledUserRoles!: string[];
  protected filteredUsersToEnroll!: User[];
  protected filteredUsersToUnroll!: User[];
  protected isLoading = false;
  protected selectedTab = 0;
  protected noUserEnrolled = false;

  protected enrollForm = new FormGroup({
    uid: new FormControl(""),
    oid: new FormControl("", Validators.required),
    role: new FormControl({ value: "", disabled: true }, Validators.required)
  });

  protected unrollForm = new FormGroup({
    uid: new FormControl(""),
    oid: new FormControl("", Validators.required),
    role: new FormControl({ value: "", disabled: true }, Validators.required)
  });

  protected orgUpdateForm = new FormGroup({
    name: new FormControl(""),
    cnpj: new FormControl("")
  });

  @ViewChild("userToEnrollInput")
  userToEnrollInput!: ElementRef<HTMLInputElement>;
  @ViewChild("userToUnrollInput")
  userToUnrollInput!: ElementRef<HTMLInputElement>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @Input()
  set org_id(org_id: string) {
    this.isLoading = true;
    let enrolledUsersIds: number[];
    // All the http requests
    const $org = this.authService.getOrg({ oid: _.parseInt(org_id) });
    const $users = this.authService.getUsers();
    const $roles = this.authService.getRoles();
    // Make all the calls in parallel
    forkJoin([$org, $users, $roles]).subscribe(([org, users, roles]) => {
      this.org = org;
      this.users = users;
      this.roles = roles;
      if (this.org.roles === null) {
        this.noUserEnrolled = true;
        this.isLoading = false;
        return;
      }
      enrolledUsersIds = org.roles.map((role) => role.user);
      this.users.forEach((user) => {
        if (enrolledUsersIds.includes(user.uid)) {
          this.enrolledUsers = [...this.enrolledUsers, user];
        }
      });
      this.isLoading = false;
    });
  }

  filterUsersToEnroll() {
    const filterValue =
      this.userToEnrollInput.nativeElement.value.toLowerCase();
    this.filteredUsersToEnroll = this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
    const role_input = this.enrollForm.get("role");
    if (!role_input) return;
    role_input.disable({ onlySelf: true });
    role_input.value !== "" ? role_input.reset() : null;
  }

  filterUserstoUnroll() {
    const filterValue =
      this.userToUnrollInput.nativeElement.value.toLowerCase();
    this.filteredUsersToUnroll = this.enrolledUsers.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
    const role_input = this.unrollForm.get("role");
    if (!role_input) return;
    role_input.disable({ onlySelf: true });
    role_input.value !== "" ? role_input.reset() : null;
  }

  onSelectUserToEnroll() {
    // TODO: Filter the roles for the selected user
    const uid = this.enrollForm.get("uid")?.value;
    if (uid) {
      const selectedUser = this.users.find(
        (user) => user.uid === _.parseInt(uid)
      );
      if (selectedUser) {
        const org_id = this.org.oid;
        // Filter only roles in this org and transform in a role[]
        const rolesInCurrentOrg = selectedUser.roles
          .filter((role) => role.org === org_id)
          .map((role) => role.role);
        this.rolesAvailables = this.roles
          .filter((role) => {
            return !rolesInCurrentOrg.includes(role.role);
          })
          .map((role) => {
            return role.role;
          });
        this.enrollForm.get("role")?.enable();
      }
    }
  }

  onSelectUserToUnroll() {
    const uid = this.unrollForm.get("uid")?.value;
    if (uid) {
      const selectedUser = this.enrolledUsers.find(
        (user) => user.uid === _.parseInt(uid)
      );
      if (selectedUser) {
        const org_id = this.org.oid;
        const rolesInCurrentOrg = selectedUser.roles
          .filter((role) => role.org === org_id)
          .map((role) => role.role);
        this.enrolledUserRoles = rolesInCurrentOrg;
        this.unrollForm.get("role")?.enable();
      }
    }
  }

  validateEnrollFormFields() {
    const uid_field = this.enrollForm.get("uid");
    const role_field = this.enrollForm.get("role");
    if (uid_field && role_field) {
      return (
        uid_field.hasError("required") ||
        (role_field.enabled ? role_field.hasError("required") : true)
      );
    } else {
      return true;
    }
  }

  validateUnrollFormFields() {
    const uid_field = this.unrollForm.get("uid");
    const role_field = this.unrollForm.get("role");
    if (uid_field && role_field) {
      return (
        uid_field.hasError("required") ||
        (role_field.enabled ? role_field.hasError("required") : true)
      );
    } else {
      return true;
    }
  }

  handleDeleteOrg() {
    const oid: OrgId = {
      oid: this.org.oid
    };
    this.authService.deleteOrg(oid).subscribe(() => {
      this.router.navigate(["/orgs"]).then(r => {
        if (r) {
          alert("Navigation completed successfully");
        } else {
          alert("Navigation failed");
        }
      });
    });
  }

  handleUpdateOrg() {
    const formValue = this.orgUpdateForm.value;
    const org = {
      ...this.org,
      ..._.omitBy(formValue, (v) => _.isEmpty(v))
    };
    this.authService.updateOrg(org).subscribe((org) => {
      this.org = org;
    });

    this.orgUpdateForm.reset();
  }

  handleEnrollUser() {
    this.enrollForm.get("oid")?.setValue(_.toString(this.org.oid));
    const { oid, uid, role } = this.enrollForm.value;
    if (uid && role && oid) {
      this.authService.enrollUser(oid, uid, { role }).subscribe((res) => {
        const [responseObject] = res;
        let user = this.users.find((user) => user.uid === responseObject.uid);
        if (!user) return;
        user = {
          ...user,
          roles: [
            ...user.roles,
            { org: responseObject.oid, role: responseObject.role }
          ]
        };
        this.enrolledUsers = this.enrolledUsers.map((u) => {
          if (u.uid === user.uid) return user;
          return u;
        });
        this.users = this.users.map((u) => {
          if (u.uid === user.uid) return user;
          return u;
        });
      });
    }
    this.enrollForm.reset();
    this.selectedTab = 0;
  }

  handleUnrollUser() {
    this.unrollForm.get("oid")?.setValue(_.toString(this.org.oid));
    const { oid, uid, role } = this.unrollForm.value;
    if (uid && role && oid) {
      this.authService.unrollUser(oid, uid, { role }).subscribe((res) => {
        const [responseObject] = res;
        let user = this.users.find((user) => user.uid === responseObject.uid);
        if (!user) return;
        if (user.roles.length === 1) {
          this.enrolledUsers = this.enrolledUsers.filter(
            (u) => u.uid !== user?.uid
          );
        } else {
          user = {
            ...user,
            roles: user.roles.filter(
              (role) => role.role !== responseObject.role
            )
          };
          // Update enrolledUsers
          this.enrolledUsers = this.enrolledUsers.map((u) => {
            if (u.uid === user?.uid) return user;
            return u;
          });
          // Update users
          this.users = this.users.map((u) => {
            if (u.uid === user?.uid) return user;
            return u;
          });
        }
      });
    }
    this.unrollForm.reset();
    this.selectedTab = 0;
  }
}
