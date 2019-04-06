import { FurnitureService } from '../../../core/services/furniture.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFurniture } from '../../../core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  furniture: IFurniture;

  constructor(private route: ActivatedRoute, private furnitureService: FurnitureService) {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.furniture = data['furnitureDetails'];
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
