import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from 'src/app/services/nav-service.service';
import { UserService } from 'src/app/services/user.service';
import { LoadingService } from 'src/app/services/loading.service';

import { User } from 'src/app/modules/user';
import { LoginResponse } from 'src/app/modules/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidInputs: string[] = [];
  failedLogin: boolean;

  constructor(
    private userService: UserService,
    private navService: NavService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.StopLoading()
  }

  async AttemptUserLogin(username, password) {

    if (!this.CheckInputs(username, password)) {
      return;
    }

    let credentials: User = {
      'username': username,
      'passwordHash': password
    }

    this.loadingService.StartLoading()
    let response = await this.userService.loginUser(credentials);
    if (response.token === undefined) {
      this.failedLogin = true;
    }
    else {
      localStorage.setItem('token', JSON.stringify(response.token));
      localStorage.setItem('username', credentials.username);
      this.navService.NavMyTeams();
    }
    this.loadingService.StopLoading()

  }

  // Checks if username and password are empty.
  // True if both inputs are valid
  CheckInputs(username, password): boolean {
    // Reset errors
    this.ClearErrors();
    // Check that removing all spaces from a username leaves some amount of characters
    // A users shouldnt be able to be ' ' or '  ', '   ' ... etc
    if (!username.replace(/\s/g, '').length) {
      this.invalidInputs.push('username');
    }
    // Password isnt empty
    if (!password.length) {
      this.invalidInputs.push('password');
    }
    // Invalid
    if (this.invalidInputs.length) {
      return false;
    }
    // Valid
    else {
      return true;
    }
  }

  ClearErrors() {
    this.invalidInputs = [];
    this.failedLogin = false;
  }

  // Emitts an event of (changeDisplay) to parent 
  @Output() changeDisplay = new EventEmitter()
  ChangeDisplay() {
    this.changeDisplay.emit();
  }
}
