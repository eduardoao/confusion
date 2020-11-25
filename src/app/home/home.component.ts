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

  constructor(private dishservice: DishService,
              private promotionservice: PromotionService,
              private leaderService: LeaderService) { }

  ngOnInit() {

    this.dishservice.getFeaturedDish()
        .then(getdisher => this.dish = getdisher);

    this.promotionservice.getFeaturedPromotion()
        .then(promotion => this.promotion = promotion);

    this.leaderService.getFeaturedLeard()
      .then(leard => this.leard = leard);
  }

}
