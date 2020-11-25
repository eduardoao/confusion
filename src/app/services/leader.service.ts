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
    return Promise.resolve(Leards);
  }

  getLeard(id: string): Promise<Leard> {
    return Promise.resolve(
      Leards.filter((leader) => (leader.id === id))[0]
      );
  }

  getFeaturedLeard(): Promise<Leard> {
    return Promise.resolve(Leards.filter((leard) => leard.featured)[0]);
  }

}
