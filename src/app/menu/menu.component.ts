import { DishService } from './../services/dish.service';
import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishers: Dish[];

  selectedDish: Dish;

  constructor(private dishService: DishService) {

   }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishers = dishes);
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
