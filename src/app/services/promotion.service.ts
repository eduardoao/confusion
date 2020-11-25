import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { promise } from 'protractor';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Promise<Promotion[]> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id: string): Promise<Promotion> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( resolve => {
      setTimeout(() => resolve(
        PROMOTIONS.filter((promotion) => (promotion.id === id))[0]),
        2000);
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return  new Promise(resolve => {
      // Simulate server latency with 3 second delay
        setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 3000);
    });
  }
}
