import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, RouterOutlet} from "@angular/router";

import {HeaderComponent} from "./component/header/header.component";

import {AuthService} from "./auth.service";

@Component({
  selector: "naval-root",
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, HeaderComponent],
  providers: [AuthService],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent {}
