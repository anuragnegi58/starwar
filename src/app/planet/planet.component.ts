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
      size = "20px";
      this.planetDetails.width = "200px";
    }
    if (this.planetDetails.population >= 10000) {
      size = "25px";
      margin = "10px";
      this.planetDetails.width = "300px";
    }
    if (this.planetDetails.population >= 100000) {
      size = "30px";
      margin = "13px";
      this.planetDetails.width = "400px";
    }
    if (this.planetDetails.population >= 1000000) {
      size = "35px";
      margin = "17px";
      this.planetDetails.width = "500px";
    }
    if (this.planetDetails.population >= 10000000) {
      size = "40px";
      margin = "20px";
      this.planetDetails.width = "600px";
    }
    if (this.planetDetails.population >= 100000000) {
      size = "45px";
      margin = "23px";
      this.planetDetails.width = "700px";
    }
    if (this.planetDetails.population >= "unknown") {
      size = "45px";
      margin = "23px";
      this.planetDetails.width = "800px";
    }
  }

  public goToPlanet($event) {
  let data = $event.split('/').slice(-2)[0];
  this.router.navigate([`planet/details/${data}`]);
  }
}
