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
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  public isUserPasswordIncorrect: boolean;
  public people = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
      this.authenticationService.currentUserSubject.next(data);
      if (data) {
        this.people.push(data);
      }
      this.people[0].results.forEach(element => {
        if (
          this.f.username.value === element.name &&
          this.f.password.value === element.birth_year
        ) {
          localStorage.setItem('user', this.f.username.value);
          this.router.navigate(['dashboard']);
        } else {
          this.loading = false;
          this.isUserPasswordIncorrect = true;
          return;
        }
      });
    });
  }
public restrictSearch() {
  if (localStorage.getItem('user') === 'Luke Skywalker') {

  }
}

public clearError() {
  this.isUserPasswordIncorrect = false;
}
  public ngAfterViewInit() {
    this.username.nativeElement.focus();
  }
}
