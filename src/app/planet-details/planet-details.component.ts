import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-planet-details",
  templateUrl: "./planet-details.component.html",
  styleUrls: ["./planet-details.component.css"]
})
export class PlanetDetailsComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  public planetDetails;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.authenticationService.getPlanetDetails(id).subscribe(data => {
      this.planetDetails = data;
    });
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  public goBack() {
    this.router.navigate(["dashboard"]);
  }
}
