import { Leard } from './../shared/leader';
import { LeaderService } from './../services/leader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leards: Leard[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit(): void {
    this.leaderService.getLeards().subscribe(leard => this.leards = leard);
  }
}
