import { DishService } from './../services/dish.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishers: Dish[];
  errMess: string;
  //selectedDish: Dish; 

  constructor(private dishService: DishService,
              @Inject('baseURL') private baseURL: string) {
               }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe( dishes => this.dishers = dishes,
        errmess => this.errMess = (errmess as any) );
  }

  // onSelect(dish: Dish){
  //   this.selectedDish = dish;
  // }

}
