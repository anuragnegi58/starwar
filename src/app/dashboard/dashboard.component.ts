import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  AfterViewInit
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("searchPlanet") searchPlanet: ElementRef;
  public suggestions;
  public suggestedPlanets = [];
  private subscriptions: Subscription = new Subscription();
  public username: string;
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
      this.router.navigate([""]);
    }
    if (this.username !== "Luke Skywalker") {
      this.setTimer = setInterval(() => {
        this.count = 0;
        this.typeahead.enable();
        this.isSearchDisabled = false;
      }, 60000);
    }
    this.subscriptions.add(
      this.planetDetails.getPlanetData().subscribe(data => {
        this.suggestions = data;
      })
    );
  }

/**
   * Function will provide suggestion based on the value entered by the user
   * @return {void}
   */
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

  /**
   * Function will restrict the user search based on user name
   * @return {void}
   */
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
  
  /**
   * Function will sign out the user
   * @return {void}
   */
  public logout() {
    localStorage.removeItem("user");
    this.router.navigate([""]);
  }

  public ngAfterViewInit() {
    this.searchPlanet.nativeElement.focus();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    clearInterval(this.setTimer);
  }
}
