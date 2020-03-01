import { Component, OnInit, ElementRef, ViewChild,
  AfterViewInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

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
  typeahead: FormControl = new FormControl();
  constructor(
    private planetDetails: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('user');
    this.planetDetails.getPlanetData().subscribe(data => {
      this.suggestions = data;
    });
  }

  public suggest() {
    if (!this.typeahead.value || this.typeahead.value === '') {
      this.suggestedPlanets = [];
    } else {
      this.suggestedPlanets = this.suggestions.results
        .filter(data => data.name.toLowerCase().includes(this.typeahead.value.toLowerCase()))
        .slice(0, 5);
    }
  }
  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  public ngAfterViewInit() {
    this.searchPlanet.nativeElement.focus();
  }
}
