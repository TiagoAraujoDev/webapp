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
export class UserDetailsComponent implements OnInit {
  protected user!: User;
  protected id!: string;
  protected users!: User[];
  protected filteredUsers!: User[];

  @ViewChild("userInput") userInput!: ElementRef<HTMLInputElement>;

  protected enrollForm = new FormGroup({
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
    const u = { uid: _.parseInt(user_id) };
    this.authService.getUser(u).subscribe((user) => {
      this.user = user;
      this.id = user_id;
    });
  }

  filterUsers() {
    const filterValue = this.userInput.nativeElement.value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit() {
    this.authService.getUsers().subscribe((users) => {
      this.users = users;
    });
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

  handleEnrollUser() {
    this.enrollForm.get("uid")?.setValue(this.id);
    const { uid, gid } = this.enrollForm.value;
    if (uid && gid) {
      this.authService.groupUser(uid, gid).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
