import { resolve } from 'dns';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Leard } from './../shared/leader';
import { Leards } from './../shared/leards';
import { promise } from 'protractor';
import { delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeards(): Observable<Leard[]> {
    return of(Leards).pipe(delay(2000));
  }

  getLeard(id: string): Observable<Leard> {

    return of(Leards.filter((leard) => (leard.id === id))[0]).pipe(delay(2000));
  }

  getFeaturedLeard(): Observable<Leard> {
    return of(Leards.filter((leard) => leard.featured)[0])
     .pipe(delay(2500));
 }

}
