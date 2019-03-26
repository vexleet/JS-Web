import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  @ViewChild("form") movieName: NgForm;
  query: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search() {
    this.query = this.movieName.value.search;

    this.router.navigate(['/search/movie'], { queryParams: { search: this.query } });
  }

}
