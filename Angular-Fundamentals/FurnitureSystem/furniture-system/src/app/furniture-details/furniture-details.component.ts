import { FurnitureService } from './../services/furniture.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  furnitureId: string;
  furniture$: Observable<any>;

  constructor(private route: ActivatedRoute, private furnitureService: FurnitureService) {
    this.furnitureId = this.route.snapshot.params['id'];

    this.furniture$ = this.furnitureService.loadFurnitureDetails(this.furnitureId);
  }

  ngOnInit() {
  }

}
