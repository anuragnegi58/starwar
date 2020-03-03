import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-planet-details",
  templateUrl: "./planet-details.component.html",
  styleUrls: ["./planet-details.component.css"]
})
export class PlanetDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public planetDetails;
  private subscriptions: Subscription = new Subscription();
  public userName: string;

  ngOnInit(): void {
    this.userName = localStorage.getItem('user');
    if (!this.userName) {
      this.router.navigate(['']);
    }
    const id = this.route.snapshot.paramMap.get("id");
    this.subscriptions.add(
    this.authenticationService.getPlanetDetails(id).subscribe(data => {
      this.planetDetails = data;
    }));
  }

/**
   * Function will sign out the user
   * @return {void}
   */
  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  /**
   * Function will take the user to dashboard
   * @return {void}
   */
  public goBack() {
    this.router.navigate(["dashboard"]);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
