import { Component, OnInit, ViewChild } from '@angular/core';
import {Dish} from '../shared/dish'
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Comment } from '../shared/comment';

import { Feedback, ContactType } from '../shared/feedback';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  providers: [DatePipe]
})

export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentFormDirective;
 
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  dishCommentForm: FormGroup;
  commentData: Comment;
  commentDish :Comment[];
  myDate : String;
  today: Date;

   
  formErrors = {
    'rating': '' ,
    'comment': '',
    'author': '',
    };
    validationMessages = {
      'author': {
        'required':      'Author  is required.',
        'minlength':     'Author Name must be at least 2 characters long.'
      },
      'comment': {
        'required':      'Your comment',
        'minlength':     'Commentaries must be at least 2 characters long.'
      }
    };
  
  
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder,private datePipe: DatePipe) {
      this.createForm();
      this.today = new Date();
      console.log(this.today);
      this.myDate = this.datePipe.transform(this.today ,'mediumDate');
      console.log(this.myDate);
    } 


  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id);this.commentDish = dish.comments });
   
  }

  createForm(): void {
      this.dishCommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: [5],
      comment: ['', [Validators.required,Validators.minLength(2)] ],
      date: this.myDate
    });

      
      this.dishCommentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

      this.onValueChanged(); // resettings validation messages now
    

   }

  onValueChanged(data?: any):void{
    if (!this.dishCommentForm) { return; }
    const form = this.dishCommentForm;
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

  onSubmit() {
    this.commentData = this.dishCommentForm.value;
    this.commentData.date = this.myDate.toString();
  
    this.commentDish.push(this.commentData);
    console.log(this.commentData);
    console.log(this.commentDish);
    this.dishCommentForm.reset({
      author: '',
      rating: 5,
      comment: ''
      
    });
    this.commentFormDirective.resetForm();
  }

  goBack(): void {
    this.location.back();
  }
  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }
}
