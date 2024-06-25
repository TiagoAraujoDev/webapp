import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { User, UserDTO } from "../../../@types/user";
import { UsersService } from "../../users.service";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

const input_info = [
  { name: "fullname", placeholder: "", required: false },
  { name: "username", placeholder: "", required: false },
  { name: "phone", placeholder: "(XX) XXXXX-XXXX", required: false },
  { name: "email", placeholder: "example@gmail.com", required: false },
];

@Component({
  selector: "naval-user-details",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css",
})
export class UserDetailsComponent {
  protected user!: User;
  protected id!: string;
  protected inputs = input_info;
  userUpdateForm = new FormGroup({
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

  updateUser(event: Event) {
    event.preventDefault();
    const userDTO: UserDTO = {};
    const formValue = this.userUpdateForm.value

    for (let prop in formValue) {
      if (Object.hasOwn(formValue, prop)){
        const value = formValue[prop as keyof typeof formValue];
        console.log(value);
        if (value !== null || value !== "") {
          userDTO[prop as keyof UserDTO] = value;
        }
      }
    }
    console.log(userDTO)
    /* this.usersService.updateUser(userDTO, parseInt(this.id)).subscribe(user => {
      this.user = user;
    }); */

  }
}
