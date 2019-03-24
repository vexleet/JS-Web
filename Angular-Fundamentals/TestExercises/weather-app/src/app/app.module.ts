import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { WeatherComponent } from "./weather/weather.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [AppComponent, WeatherComponent],
  imports: [BrowserModule, HttpClientModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
