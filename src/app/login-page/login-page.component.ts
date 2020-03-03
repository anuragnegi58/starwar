﻿import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  @ViewChild("username") username: ElementRef;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public isUserPasswordIncorrect: boolean;
  public userName: string;
  public people = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.userName = localStorage.getItem('user');
    if (this.userName) {
      this.router.navigate(["dashboard"]);
    }
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.getData().subscribe(data => {
      this.people.push(data);
      this.people[0].results.forEach(element => {
        if (
          this.f.username.value === element.name &&
          this.f.password.value === element.birth_year
        ) {
          localStorage.setItem("user", this.f.username.value);
          this.router.navigate(["dashboard"]);
        } else {
          this.loading = false;
          this.isUserPasswordIncorrect = true;
          return;
        }
      });
    });
  }

  public clearError() {
    this.isUserPasswordIncorrect = false;
  }
  public ngAfterViewInit() {
    this.username.nativeElement.focus();
  }
}
