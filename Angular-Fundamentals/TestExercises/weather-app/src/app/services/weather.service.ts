import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { City } from "../interfaces/city";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "&appid=6f6ae02c514da11961572e9852e0811d";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getTodayWeatherForCity(cityToSearch: string) {
    return this.http.get<City>(
      BASE_URL + `?q=${cityToSearch}&units=metric` + API_KEY
    );
  }
}
