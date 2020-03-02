import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { PlanetComponent } from "./planet.component";

describe("PlanetComponent", () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;
  let router = {
    navigate: jasmine.createSpy("planet/details/1") // to spy on the url that has been routed
  };
  let mockResponse = {
    name: "Dagobah",
    rotation_period: "23",
    orbital_period: "341",
    diameter: "8900",
    climate: "murky",
    gravity: "N/A",
    terrain: "swamp, jungles",
    surface_water: "8",
    population: "1000000000",
    residents: [],
    films: [
      "https://swapi.co/api/films/2/",
      "https://swapi.co/api/films/6/",
      "https://swapi.co/api/films/3/"
    ],
    created: "2014-12-10T11:42:22.590000Z",
    edited: "2014-12-20T20:58:18.425000Z",
    url: "https://swapi.co/api/planets/5/"
  };
  let mockResponse1 = {
    name: "Dagobah",
    rotation_period: "23",
    orbital_period: "341",
    diameter: "8900",
    climate: "murky",
    gravity: "N/A",
    terrain: "swamp, jungles",
    surface_water: "8",
    population: "unknown",
    residents: [],
    films: [
      "https://swapi.co/api/films/2/",
      "https://swapi.co/api/films/6/",
      "https://swapi.co/api/films/3/"
    ],
    created: "2014-12-10T11:42:22.590000Z",
    edited: "2014-12-20T20:58:18.425000Z",
    url: "https://swapi.co/api/planets/5/"
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: router }],
      declarations: [PlanetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    component.planetDetails = mockResponse;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should set width if population is >= 100000000", () => {
    component.planetDetails = mockResponse1;
    expect(component).toBeTruthy();
  });

  it("should redirect to planet details", () => {
    component.planetDetails = mockResponse1;
    component.goToPlanet('https://swapi.co/api/planets/5/');
    expect(component).toBeTruthy();
  });
});
