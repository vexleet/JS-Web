import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFurnitureComponent } from './user-furniture.component';

describe('UserFurnitureComponent', () => {
  let component: UserFurnitureComponent;
  let fixture: ComponentFixture<UserFurnitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
