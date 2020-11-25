import { Injectable } from '@angular/core';

import { Dish } from './../shared/dish';
import { DISHEs} from '../shared/dishers';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve(DISHEs), 3000);
    });
  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve(DISHEs.filter((dish) => (dish.id === id))[0]), 3000);
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return  new Promise(resolve => {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve(DISHEs.filter((dish) => dish.featured)[0]), 3000);
    });
  }

}
