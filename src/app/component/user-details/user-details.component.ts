import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { User } from "../../../@types/user";
import { UsersService } from "../../users.service";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

const input_info = [
  { name: "fullname", placeholder: "", required: false },
  { name: "username", placeholder: "", required: false },
  { name: "phone", placeholder: "(XX) XXXXX-XXXX", required: false },
  { name: "email", placeholder: "example@gmail.com", required: false },
]

@Component({
  selector: "naval-user-details",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css",
})
export class UserDetailsComponent {
  protected user!: User;
  protected inputs = input_info;
  constructor(private usersService: UsersService) { }
  @Input()
  set user_id(user_id: string) {
    this.usersService.getUser(user_id).subscribe((user) => {
      this.user = user;
    });
  }
}
