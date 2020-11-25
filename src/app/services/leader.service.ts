import { resolve } from 'dns';
import { Injectable } from '@angular/core';

import { Leard } from './../shared/leader';
import { Leards } from './../shared/leards';
import { promise } from 'protractor';



@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeards(): Promise<Leard[]> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise(resolve => {
      setTimeout(() => resolve(Leards), 2000);
    });
  }

  getLeard(id: string): Promise<Leard> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( resolve => {
      setTimeout(() => resolve(
        Leards.filter((leard) => (leard.id === id))[0]),
        2000);
    });
  }

  getFeaturedLeard(): Promise<Leard> {
  return  new Promise(resolve => {
    // Simulate server latency with 3 second delay
      setTimeout(() => resolve(Leards.filter((leard) => leard.featured)[0]), 3000);
  });
  }

}
