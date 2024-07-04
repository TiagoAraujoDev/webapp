import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import _ from "lodash";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { AuthService } from "../../auth.service";
import { Org, Role, User, UserId } from "../../../@types/auth";
import { Router, RouterModule } from "@angular/router";
import { MatDividerModule } from "@angular/material/divider";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "naval-user-details",
  standalone: true,
  imports: [
    CommonModule,
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
    MatAutocompleteModule,
  ],
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.css",
})
export class UserDetailsComponent implements OnInit {
  protected user!: User;
  protected id!: string;
  protected roles!: Role[];
  protected orgs!: Org[];
  protected filteredOrgs!: Org[];

  @ViewChild("orgInput") orgInput!: ElementRef<HTMLInputElement>;

  protected enrollForm = new FormGroup({
    role: new FormControl(""),
    oid: new FormControl(""),
    uid: new FormControl(0),
  });

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
      console.log(user);
      this.user = user;
      this.id = user_id;
    });
  }

  filterOrgs() {
    const filterValue = this.orgInput.nativeElement.value.toLowerCase();
    this.filteredOrgs = this.orgs.filter((org) =>
      org.name.toLowerCase().includes(filterValue),
    );
  }

  ngOnInit() {
    this.authService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
    this.authService.getOrgs().subscribe((orgs) => {
      this.orgs = orgs;
    });
  }

  handleDeleteUser(): void {
    const uid: UserId = {
      uid: _.parseInt(this.id),
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
        (v) => _.isEmpty(v),
      ),
    };
    this.authService.updateUser(user).subscribe((user) => {
      this.user = user;
    });

    this.userUpdateForm.reset();
  }

  handleEnrollUser() {
    this.enrollForm.get("uid")?.setValue(_.parseInt(this.id));
    console.log(this.enrollForm.value);
  }
}
