import { ToastrService } from 'ngx-toastr';
import { FurnitureService } from '../../../core/services/furniture.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-delete-furniture',
  templateUrl: './delete-furniture.component.html',
  styleUrls: ['./delete-furniture.component.css']
})
export class DeleteFurnitureComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteFurniture() {
    const furnitureId = this.route.snapshot.params['id'];

    this.furnitureService.deleteFurniture(furnitureId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => {
        this.toastr.success('Furniture deleted successfully');
        this.router.navigate(['/furniture', 'user']);
      })
  }

}
