import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ActivatedRoute, Router, convertToParamMap } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { PlanetDetailsComponent } from "./planet-details.component";

describe("PlanetDetailsComponent", () => {
  let component: PlanetDetailsComponent;
  let fixture: ComponentFixture<PlanetDetailsComponent>;
  let service: AuthenticationService;
  let router = {
    navigate: jasmine.createSpy("dashboard") // to spy on the url that has been routed
  };
  let mockResponse = {
    name: "Alderaan",
    rotation_period: "24",
    orbital_period: "364",
    diameter: "12500",
    climate: "temperate",
    gravity: "1 standard",
    terrain: "grasslands, mountains",
    surface_water: "40",
    population: "2000000000",
    residents: [
      "https://swapi.co/api/people/5/",
      "https://swapi.co/api/people/68/",
      "https://swapi.co/api/people/81/"
    ],
    films: ["https://swapi.co/api/films/6/", "https://swapi.co/api/films/1/"],
    created: "2014-12-10T11:35:48.479000Z",
    edited: "2014-12-20T20:58:18.420000Z",
    url: "https://swapi.co/api/planets/2/"
  };
  let route = {
    snapshot: jasmine.createSpy("paramMap") // to spy on the url that has been routed
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: "3" }) } }
        },
        {
          provide: AuthenticationService,
          useValue: jasmine.createSpyObj("AuthenticationService", [
            "getPlanetDetails"
          ])
        }
      ],
      declarations: [PlanetDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(AuthenticationService);
    service.getPlanetDetails = jasmine
      .createSpy()
      .and.returnValue(of(mockResponse));
    fixture = TestBed.createComponent(PlanetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should logout the user", () => {
    component.logout();
    expect(component).toBeTruthy();
  });

  it("should redirect the user to dashboard", () => {
    component.goBack();
    expect(component).toBeTruthy();
  });
});
