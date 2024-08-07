import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { AuthService } from "../../auth.service";
import { User, UserData } from "../../../@types/auth";

@Component({
  selector: "naval-user-add",
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: "./user-add.component.html",
  styleUrl: "./user-add.component.css"
})
export class UserAddComponent {
  protected user: User | null = null;

  constructor(private authService: AuthService) {}

  protected addUserForm = new FormGroup({
    username: new FormControl(""),
    email: new FormControl(""),
    name: new FormControl(""),
    picture: new FormControl(""),
    verified: new FormControl(true),
    active: new FormControl(true)
  });

  handleAddUser(event: Event) {
    event.preventDefault();
    this.authService
      .createUser(this.addUserForm.value as UserData)
      .subscribe((user) => {
        this.user = user;
      });
  }
}
