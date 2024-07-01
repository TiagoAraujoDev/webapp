import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "naval-user-add",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: "./user-add.component.html",
  styleUrl: "./user-add.component.css",
})
export class UserAddComponent {
  title = "new user";
  protected addUserForm = new FormGroup({
    username: new FormControl(""),
    email: new FormControl(""),
    name: new FormControl(""),
    picture: new FormControl("token"),
    verified: new FormControl(true),
    active: new FormControl(true),
  });
}
