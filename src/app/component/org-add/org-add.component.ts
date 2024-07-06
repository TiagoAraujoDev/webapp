import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

import { AuthService } from "../../auth.service";
import { Org, OrgData } from "../../../@types/auth";

@Component({
  selector: "naval-org-add",
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: "./org-add.component.html",
  styleUrl: "./org-add.component.css"
})
export class OrgAddComponent {
  protected org: Org | null = null;

  constructor(private authService: AuthService) {}

  protected addOrgForm = new FormGroup({
    name: new FormControl(""),
    cnpj: new FormControl(""),
    picture: new FormControl("")
  });

  handleAddOrg() {
    this.authService
      .createOrg(this.addOrgForm.value as OrgData)
      .subscribe((org) => {
        console.log(org);
        this.org = org;
      });
  }
}
