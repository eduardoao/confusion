import { Comment } from './../shared/comment';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { filter, switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {

  dishcopy: Dish;
  @ViewChild('fform') commentFormDirective;
  @Input()
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  commentForm: FormGroup;
  comment: Comment;
  errMess: string;

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 1;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  value = 5;
  vertical = false;
  tickInterval = 1;

  formErrors = {
    name: '',
    comment: '',
    rating: 0
  };

  validationMessages = {
    name: {
      required:      'First Name is required.',
      minlength:     'First Name must be at least 2 characters long.',
      maxlength:     'name cannot be more than 25 characters long.'
    },
    comment: {
      required:   'Comment is required.',
      minlength:  'Comment must be at least 2 characters long.',
      maxlength:  'Comment cannot be more than 500 characters long.'
    },
    rating: {
      required:   'Rating is required.',
      minlength:  'Rating must be at 1 star.'
    }
  };

  
  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
              this.createForm();
              }

  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);

    // this.route.params
    // .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    // .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
    // errmess => this.errMess = (errmess as any) );

    this.route.params
    .pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
      errmess => this.errMess = (errmess as any) );


  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
  goBack() {
    this.location.back();
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

  }
  createForm() {

    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)] ],
      rating: [1, [Validators.required, Validators.minLength(1)]]});

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    this.commentForm.statusChanges
    .subscribe(val => this.onFormValidation(val));
    this.onFormValidation('');

  }
  onSubmit(){
    this.onFormValidation('');
    this.comment = this.commentForm.value;
    console.log(this.comment);

    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = (errmess as any); });

    this.commentForm.reset({
      name: '',
      Comment: '',
      rating: 5
    });
    this.commentFormDirective.resetForm();
  }
  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  onFormValidation(validity: string) {
    switch (validity) {
      case 'VALID':
        const form = this.commentForm;
        const name = form.get('name');
        const ratin = form.get('rating');
        const commentItem = form.get('comment');
        if (name.touched && commentItem.touched ){
          const lastcomment = this.dish.comments.filter(d => d.date === '');
          if (lastcomment.length === 0){
            this.dish.comments.push({ author: name.value, comment: commentItem.value, rating : ratin.value, date: '' });
          }
      }
        break;
      case 'INVALID':
        // tslint:disable-next-line: triple-equals
        if (this.dish != null){
        this.dish.comments.filter(removeLastItemArray);
        }
        break;
    }

    function removeLastItemArray() {
      return '';
    }
  }
}
