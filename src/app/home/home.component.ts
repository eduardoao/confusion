import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';

import { Leard } from './../shared/leader';
import { LeaderService } from './../services/leader.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leard: Leard;
  dishErrMess: string;

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderService: LeaderService) { }

  ngOnInit() {

    this.dishservice.getFeaturedDish()
        .subscribe(getdisher => this.dish = getdisher,
          errmess => this.dishErrMess = (errmess as any));

    this.promotionservice.getFeaturedPromotion()
        .subscribe(promotion => this.promotion = promotion);

    this.leaderService.getFeaturedLeard()
      .subscribe(leard => this.leard = leard);
  }

}
