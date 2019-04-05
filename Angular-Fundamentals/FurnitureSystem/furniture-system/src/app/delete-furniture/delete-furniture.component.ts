import { ToastrService } from 'ngx-toastr';
import { FurnitureService } from './../services/furniture.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-furniture',
  templateUrl: './delete-furniture.component.html',
  styleUrls: ['./delete-furniture.component.css']
})
export class DeleteFurnitureComponent implements OnInit {

  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  deleteFurniture() {
    const furnitureId = this.route.snapshot.params['id'];

    this.furnitureService.deleteFurniture(furnitureId).subscribe(_ => {
      this.toastr.success('Furniture deleted successfully');
      this.router.navigate(['/user', 'furniture']);
    })
  }

}
