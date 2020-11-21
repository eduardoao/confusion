import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHEs } from '../shared/dishers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishers: Dish[] = DISHEs;

  selectedDish: Dish;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
