import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthStatus } from './utils/interfaces/auth-status.interface';
import { AuthService } from './utils/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
  
export class AuthComponent {

  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  change: boolean = true;

  public loginForm: FormGroup = this.fb.group({
    username: ['Raulito', [Validators.required, Validators.minLength(3)]],
    password: ['123', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit() {

    const { username, password } = this.loginForm.value;
    this.authService.login({ username, password }).subscribe(
      success => {

        if (!success) {
          Swal.fire('Error de Inicio de Sesión',
            'Datos incorrectos', 'error');
          return;
        }

        localStorage.setItem('lastPath', '/dashboard');
        this.router.navigateByUrl('/dashboard');
        
      }
    );
  }

  isChecking(): boolean {
    return this.authService.authStatus() === AuthStatus.checking;
  }

}
