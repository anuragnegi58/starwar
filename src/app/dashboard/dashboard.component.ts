import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild("searchPlanet") searchPlanet: ElementRef;
  public suggestions;
  public suggestedPlanets = [];
  public username: string;
  public subject = new Subject<string>();
  public setTimer;
  public count = 0;
  public isSearchDisabled: boolean;
  public typeahead: FormControl = new FormControl();
  constructor(
    private planetDetails: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("user");
    if (!this.username) {
      this.router.navigate(['']);
    }
    if (this.username !== "Luke Skywalker") {
    this.setTimer = setInterval(() => {
      this.count = 0;
      this.typeahead.enable();
      this.isSearchDisabled = false;
    }, 60000);
  }
    this.planetDetails.getPlanetData().subscribe(data => {
      this.suggestions = data;
    });
  }

  public suggest() {
    if (!this.typeahead.value || this.typeahead.value === "") {
      this.suggestedPlanets = [];
    } else {
      if (this.suggestions && this.suggestions.results) {
        this.suggestedPlanets = this.suggestions.results
          .filter(data =>
            data.name.toLowerCase().includes(this.typeahead.value.toLowerCase())
          )
          .slice(0, 5);
      }
    }
  }
  public restrictSearch() {
    if (this.username !== "Luke Skywalker") {
      this.count++;
      if (this.count <= 15) {
        this.suggest();
      } else {
        this.suggestedPlanets = [];
        this.typeahead.disable();
        this.isSearchDisabled = true;
      }
    } else {
      this.suggest();
    }
  }
  public logout() {
    localStorage.removeItem("user");
    this.router.navigate([""]);
  }

  public ngAfterViewInit() {
    this.searchPlanet.nativeElement.focus();
  }
}
