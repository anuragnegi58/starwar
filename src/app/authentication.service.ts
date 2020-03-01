﻿import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public authenticateUser(username, password) {
    return this.http.get(`https://swapi.co/api/people/`);
  }

  public getData() {
    return this.http.get(`https://swapi.co/api/people/`);
  }

  public getPlanetData() {
    return this.http.get(`https://swapi.co/api/planets/`);
  }
  public getPlanetDetails(id) {
    return this.http.get(`https://swapi.co/api/planets/${id}`);
  }
}
