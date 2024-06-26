import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import _ from "lodash";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { AuthService } from "../../auth.service";
import { Role, User, UserId } from "../../../@types/auth";
import { Router } from "@angular/router";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  selector: "naval-user-details",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
  ],
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css",
})
export class UserDetailsComponent implements OnInit {
  protected user!: User;
  protected id!: string;
  protected roles!: Role[];

  protected roleInput = new FormControl("");
  protected userUpdateForm = new FormGroup({
    name: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl(""),
    active: new FormControl(),
    verified: new FormControl(),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  @Input()
  set user_id(user_id: string) {
    const u = { uid: _.parseInt(user_id) };
    this.authService.getUser(u).subscribe((user) => {
      this.user = user;
      this.id = user_id;
    });
  }

  ngOnInit() {
    this.authService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  handleAddRole(): void {
    // TODO: Add call to POST /auth/roles
    console.log(this.roleInput);
  }

  handleDeleteUser(): void {
    const uid: UserId = {
      uid: _.parseInt(this.id),
    };
    this.authService.deleteUser(uid).subscribe();
    this.router.navigate(["/users"]);
  }

  handleUpdateUser(event: Event): void {
    event.preventDefault();
    const formValue = this.userUpdateForm.value;
    const user = {
      ...this.user,
      ..._.omitBy(
        _.omitBy(formValue, (v) => _.isNull(v)),
        (v) => _.isEmpty(v),
      ),
    };
    this.authService.updateUser(user).subscribe((user) => {
      this.user = user;
    });

    this.userUpdateForm.reset();
  }
}
