import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NavService {
  constructor(private router: Router) { }

  NavLandingPage() {
    this.router.navigateByUrl("/LandingPage");
  }

  NavMyTeam() {
    this.router.navigateByUrl("/MyTeam");
  }

  NavManagePlayers(teamName: string) {
    this.router.navigateByUrl("/ManagePlayers");
  }

  NavTeamSummary(teamName: string) {
    this.router.navigateByUrl("/TeamSummary");
  }
}
