import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DashboardComponent } from "./dashboard.component";
import { of } from 'rxjs';

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: AuthenticationService;
  let router = {
    navigate: jasmine.createSpy("") // to spy on the url that has been routed
  };
  let mockResponse = {
    count: 61,
    next: "https://swapi.co/api/planets/?page=2",
    previous: null,
    results: [
      {
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
      },
      {
        name: "Bespin",
        rotation_period: "12",
        orbital_period: "5110",
        diameter: "118000",
        climate: "temperate",
        gravity: "1.5 (surface), 1 standard (Cloud City)",
        terrain: "gas giant",
        surface_water: "0",
        population: "6000000",
        residents: ["https://swapi.co/api/people/26/"],
        films: ["https://swapi.co/api/films/2/"],
        created: "2014-12-10T11:43:55.240000Z",
        edited: "2014-12-20T20:58:18.427000Z",
        url: "https://swapi.co/api/planets/6/"
      },
      {
        name: "Endor",
        rotation_period: "18",
        orbital_period: "402",
        diameter: "4900",
        climate: "temperate",
        gravity: "0.85 standard",
        terrain: "forests, mountains, lakes",
        surface_water: "8",
        population: "30000000",
        residents: ["https://swapi.co/api/people/30/"],
        films: ["https://swapi.co/api/films/3/"],
        created: "2014-12-10T11:50:29.349000Z",
        edited: "2014-12-20T20:58:18.429000Z",
        url: "https://swapi.co/api/planets/7/"
      },
      {
        name: "Coruscant",
        rotation_period: "24",
        orbital_period: "368",
        diameter: "12240",
        climate: "temperate",
        gravity: "1 standard",
        terrain: "cityscape, mountains",
        surface_water: "unknown",
        population: "1000000000000",
        residents: [
          "https://swapi.co/api/people/34/",
          "https://swapi.co/api/people/55/",
          "https://swapi.co/api/people/74/"
        ],
        films: [
          "https://swapi.co/api/films/5/",
          "https://swapi.co/api/films/4/",
          "https://swapi.co/api/films/6/",
          "https://swapi.co/api/films/3/"
        ],
        created: "2014-12-10T11:54:13.921000Z",
        edited: "2014-12-20T20:58:18.432000Z",
        url: "https://swapi.co/api/planets/9/"
      },
      {
        name: "Kamino",
        rotation_period: "27",
        orbital_period: "463",
        diameter: "19720",
        climate: "temperate",
        gravity: "1 standard",
        terrain: "ocean",
        surface_water: "100",
        population: "1000000000",
        residents: [
          "https://swapi.co/api/people/22/",
          "https://swapi.co/api/people/72/",
          "https://swapi.co/api/people/73/"
        ],
        films: ["https://swapi.co/api/films/5/"],
        created: "2014-12-10T12:45:06.577000Z",
        edited: "2014-12-20T20:58:18.434000Z",
        url: "https://swapi.co/api/planets/10/"
      },
      {
        name: "Geonosis",
        rotation_period: "30",
        orbital_period: "256",
        diameter: "11370",
        climate: "temperate, arid",
        gravity: "0.9 standard",
        terrain: "rock, desert, mountain, barren",
        surface_water: "5",
        population: "100000000000",
        residents: ["https://swapi.co/api/people/63/"],
        films: ["https://swapi.co/api/films/5/"],
        created: "2014-12-10T12:47:22.350000Z",
        edited: "2014-12-20T20:58:18.437000Z",
        url: "https://swapi.co/api/planets/11/"
      }
    ]
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: router },
        {
          provide: AuthenticationService,
          useValue: jasmine.createSpyObj("AuthenticationService", [
            "getPlanetData"
          ])
        }
      ],
      declarations: [DashboardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(AuthenticationService);
    service.getPlanetData = jasmine.createSpy().and.returnValue(of(mockResponse));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return nothing if seachbox is empty", () => {
    component.typeahead.setValue("");
    component.suggest();
    expect(component.suggestedPlanets.length).toBe(0);
  });

  it("should search value in searchbox", () => {
    component.typeahead.setValue("a");
    component.suggestions = mockResponse;
    component.suggest();
    expect(component.suggestedPlanets.length).toBe(3);
  });

  it("should not restrict search if username is Luke Skywalker", () => {
    component.username = 'Luke Skywalker';
    component.restrictSearch();
    expect(component.suggestedPlanets.length).toBe(0);
  });

  it("should restrict search if username is not Luke Skywalker", () => {
    component.username = 'Adan';
    component.typeahead.setValue("a");
    component.restrictSearch();
    expect(component.suggestedPlanets.length).toBe(3);
  });
  it("should disable the search box if search count is more than 15", () => {
    component.username = 'Adan';
    component.count = 16;
    component.typeahead.setValue("a");
    component.restrictSearch();
    expect(component.suggestedPlanets.length).toBe(0);
    expect(component.isSearchDisabled).toBeTruthy();
  });
  it("should logout the user", () => {
    component.logout();
    expect(component.isSearchDisabled).toBeFalsy();
  });
});
