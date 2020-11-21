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
}
