import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { User } from "../../../@types/user";
import { UsersService } from "../../users.service";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { Role } from "../../../@types/role";

@Component({
  selector: "naval-user-details",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css",
})
export class UserDetailsComponent implements OnInit {
  protected user!: User;
  protected id!: string;
  protected roles!: Role[];

  // form
  protected roleInput = new FormControl("");
  protected userUpdateForm = new FormGroup({
    username: new FormControl(""),
    fullname: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
  });

  constructor(private usersService: UsersService) { }

  @Input()
  set user_id(user_id: string) {
    this.usersService.getUser(user_id).subscribe((user) => {
      this.user = user;
      this.id = user_id;
    });
  }

  ngOnInit() {
    this.usersService.getRoles().subscribe(roles => {
      console.log("roles", roles)
      this.roles = roles;
    });
  }

  updateUser(event: Event) {
    event.preventDefault();
    const formValue = this.userUpdateForm.value

    this.usersService.updateUser(formValue, parseInt(this.id)).subscribe(user => {
      this.user = user;
    });
  }
}
