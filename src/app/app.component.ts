import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/utils/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const lastPath = localStorage.getItem('lastPath');
  
    if (!token || !lastPath) {
      this.router.navigateByUrl('auth');
      this.authService.logout();
      return;
    }
  
  }
}
