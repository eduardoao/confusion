import { Injectable } from '@angular/core';

import { Dish } from './../shared/dish';
import { DISHEs} from '../shared/dishers';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHEs;
  }

  getDish(id: string): Dish {
    return DISHEs.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return DISHEs.filter((dish) => dish.featured)[0];
  }

}
