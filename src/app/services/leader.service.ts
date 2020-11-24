import { Injectable } from '@angular/core';

import { Leard } from './../shared/leader';
import { Leards } from './../shared/leards';



@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeards(): Leard[] {
    return Leards;
  }

  getLeard(id: string): Leard {
    return Leards.filter((leader) => (leader.id === id))[0];
  }

  getFeaturedLeard(): Leard {
    return Leards.filter((leard) => leard.featured)[0];
  }

}
