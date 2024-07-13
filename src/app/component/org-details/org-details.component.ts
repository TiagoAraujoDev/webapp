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
  protected noRoles = true;
  protected roles!: Role[];
  protected users!: User[];
  protected enrolledUsers: User[] = [];
  protected enrolledUserRoles!: { oid: number; role: string }[];
  protected filteredUsersToEnroll!: User[];
  protected filteredUsersToUnroll!: User[];
  protected isLoading = false;

  protected enrollForm = new FormGroup({
    uid: new FormControl(""),
    oid: new FormControl(""),
    role: new FormControl<Role>({ role: "" })
  });

  protected unrollForm = new FormGroup({
    uid: new FormControl(""),
    oid: new FormControl(""),
    role: new FormControl<Role>(
      { value: { role: "" }, disabled: true },
      Validators.required
    )
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
  }

  filterUserstoUnroll() {
    const filterValue =
      this.userToUnrollInput.nativeElement.value.toLowerCase();
    this.filteredUsersToUnroll = this.enrolledUsers.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
    // ISSUE: This is the best way...???
    this.unrollForm.get("role")?.disable();
  }

  onSelectedUser() {
    // FIX: Remove some unnecessary code
    console.log("selected");
    const uid = this.unrollForm.get("uid")?.value;
    if (uid) {
      this.noRoles = true;
      const selectedUser = this.enrolledUsers.find(
        (user) => user.uid === _.parseInt(uid)
      );
      if (selectedUser) {
        this.enrolledUserRoles = selectedUser?.roles;
        this.unrollForm.get("role")?.enable();
      } else {
        this.unrollForm.get("role")?.disable();
      }
    }
  }

  handleDeleteOrg() {
    const oid: OrgId = {
      oid: this.org.oid
    };
    this.authService.deleteOrg(oid).subscribe(() => {
      this.router.navigate(["/orgs"]);
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
    // TODO: Reset inputs and update the relation
    this.enrollForm.get("oid")?.setValue(_.toString(this.org.oid));
    const { oid, uid, role } = this.enrollForm.value;
    if (uid && role?.role && oid) {
      this.authService.enrollUser(oid, uid, role).subscribe((res) => {
        console.log(res);
      });
    }
  }

  handleUnrollUser() {
    // TODO: Reset inputs and update the relation
    this.enrollForm.get("oid")?.setValue(_.toString(this.org.oid));
    const { oid, uid, role } = this.enrollForm.value;
    if (uid && role?.role && oid) {
      this.authService.unrollUser(oid, uid, role).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
