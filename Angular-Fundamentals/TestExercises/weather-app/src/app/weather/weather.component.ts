import { Component, OnInit, EventEmitter } from "@angular/core";
import { City } from "./../interfaces/city";
import { WeatherService } from "../services/weather.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  city: City;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  getTodayWeatherForCity(cityToSearch: string) {
    this.weatherService.getTodayWeatherForCity(cityToSearch).subscribe(res => {
      this.city = res;
    });
  }
}
