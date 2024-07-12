import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import _ from "lodash";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatDividerModule } from "@angular/material/divider";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

import { User, UserId } from "../../../@types/auth";
import { AuthService } from "../../auth.service";

@Component({
  selector: "naval-user-details",
  standalone: true,
  imports: [
    ReactiveFormsModule,
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
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css"
})
export class UserDetailsComponent {
  protected users!: User[];
  protected user!: User;
  protected id!: string;
  protected groups!: User[];
  protected filteredUsers!: User[];
  protected filteredGroups!: User[];
  protected noGroups = true;

  @ViewChild("userInput") userInput!: ElementRef<HTMLInputElement>;
  @ViewChild("groupInput") groupInput!: ElementRef<HTMLInputElement>;

  protected groupUserForm = new FormGroup({
    gid: new FormControl(""),
    uid: new FormControl("")
  });

  protected ungroupUserForm = new FormGroup({
    gid: new FormControl(""),
    uid: new FormControl("")
  });

  protected userUpdateForm = new FormGroup({
    name: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl(""),
    active: new FormControl(),
    verified: new FormControl()
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @Input()
  set user_id(user_id: string) {
    this.id = user_id;
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
      const user = this.users.find((user) => {
        return user.uid === _.parseInt(this.id);
      });
      if (!user) {
        return;
      } else {
        this.user = user;
        if (_.isArray(this.user.groups)) {
          this.noGroups = false;
          this.groups = this.users.filter((users) => {
            return this.user.groups.includes(users.uid);
          });
        }
      }
    });
  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  filterGroups() {
    console.log(this.filteredGroups);
    const filterValue = this.groupInput.nativeElement.value.toLowerCase();
    this.filteredGroups = this.groups.filter((group) =>
      group.name.toLowerCase().includes(filterValue)
    );
  }

  handleDeleteUser(): void {
    const uid: UserId = {
      uid: _.parseInt(this.id)
    };
    this.authService.deleteUser(uid).subscribe(() => {
      this.router.navigate(["/users"]);
    });
  }

  handleUpdateUser(): void {
    const formValue = this.userUpdateForm.value;
    const user = {
      ...this.user,
      ..._.omitBy(
        _.omitBy(formValue, (v) => _.isNull(v)),
        (v) => _.isEmpty(v)
      )
    };
    this.authService.updateUser(user).subscribe((user) => {
      this.user = user;
    });
    this.userUpdateForm.reset();
  }

  handleGroupUser() {
    this.groupUserForm.get("uid")?.setValue(this.id);
    const { uid, gid } = this.groupUserForm.value;
    if (uid && gid) {
      this.authService.groupUser(uid, gid).subscribe((res) => {
        const newGroup = this.users.find((user) => {
          return user.uid === res.gid;
        });
        this.groups = [...this.groups, newGroup!];
        this.groupUserForm.get("gid")?.reset();
      });
    }
  }

  handleUngroupUser() {
    this.ungroupUserForm.get("uid")?.setValue(this.id);
    const { uid, gid } = this.ungroupUserForm.value;
    if (uid && gid) {
      this.authService.ungroupUser(uid, gid).subscribe((res) => {
        const filteredGroup = this.users.filter((user) => {
          return user.uid !== res.gid;
        });
        this.groups = filteredGroup;
        this.groupUserForm.get("gid")?.reset();
      });
    }
  }
}
