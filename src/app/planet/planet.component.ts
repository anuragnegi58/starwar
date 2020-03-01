import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-planet",
  templateUrl: "./planet.component.html",
  styleUrls: ["./planet.component.css"]
})
export class PlanetComponent implements OnInit {
  constructor( private router: Router,) {}
  @Input("planetDetails") planetDetails;

  ngOnInit(): void {
    let size = "10px";
    let margin = "5px";
    if (this.planetDetails.population >= 1000) {
      this.planetDetails.size = "10px";
      this.planetDetails.width = "400px";
    }
    if (this.planetDetails.population >= 10000) {
      this.planetDetails.size = "15px";
      margin = "10px";
      this.planetDetails.width = "400px";
    }
    if (this.planetDetails.population >= 100000) {
      this.planetDetails.size = "20px";
      margin = "13px";
      this.planetDetails.width = "400px";
    }
    if (this.planetDetails.population >= 1000000) {
      this.planetDetails.size = "25px";
      margin = "17px";
      this.planetDetails.width = "400px";
    }
    if (this.planetDetails.population >= 10000000) {
      this.planetDetails.size = "28px";
      margin = "20px";
      this.planetDetails.width = "400px";
    }
    if (this.planetDetails.population >= 100000000) {
      this.planetDetails.size = "30px";
      margin = "23px";
      this.planetDetails.width = "450px";
    }
    if (this.planetDetails.population >= "unknown") {
      this.planetDetails.size = "35px";
      margin = "23px";
      this.planetDetails.width = "400px";
    }
  }

  public goToPlanet($event) {
  let data = $event.split('/').slice(-2)[0];
  this.router.navigate([`planet/details/${data}`]);
  }
}
