import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthStatus } from './utils/interfaces/auth-status.interface';
import { AuthService } from './utils/services/auth.service';
import { Observable } from 'rxjs';
import { Entity } from '../dashboard/interfaces/entity.interface';
import { EntitesService } from '../dashboard/services/entites.service';
import { EntiyArea } from '../dashboard/interfaces/entityArea.interface';

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
  private entitesService = inject(EntitesService)
  private router = inject(Router)
  private cdRef = inject(ChangeDetectorRef);

  public entitiesSelectResults$!: Observable<Entity[]>;

  public areas: EntiyArea[] = [];

  change: boolean = true;

  public loginForm: FormGroup = this.fb.group({
    username: ['Raulito', [Validators.required, Validators.minLength(3)]],
    password: ['0000', [Validators.required, Validators.minLength(3)]],
    entity:[ , [Validators.required]],
    areaEntitie:[ , [Validators.required]]
  });

  public authStatusChangedEffect = effect(async () =>{
    this.entitiesSelectResults$ = this.entitesService.getAllEntities();
    this.cdRef.detectChanges();
  });

  onSubmit() {

    const { username, password , entity, areaEntitie: area} = this.loginForm.value;

    if ( entity === null || area === null ){
      Swal.fire('Error','Seleccione la Entidad', 'error');
    return;
    }

    this.authService.login({ username, password , entity, area}).subscribe(
      response => {

        if (!response.success) {
          Swal.fire('Inicio de Sesión',
            response.api_message, 'error');
          return;
        }

        localStorage.setItem('lastPath', '/dashboard');
        this.router.navigateByUrl('/dashboard');

      }
    );
  }

  onEntityChange() {
    this.entitesService.getAllEntitiesArea(this.loginForm.value.entity).subscribe(
      response => {
        for (const area of response) {
          this.areas.push(area);
        }
        this.cdRef.detectChanges();
      }
    );
  }

  isChecking(): boolean {
    return this.authService.authStatus() === AuthStatus.checking;
  }

}
