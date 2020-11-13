import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  userDetails$: Observable<any>;
  processing: boolean;
  currentUrl: string[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails$ = this.authService.getUser$();
  }

}
