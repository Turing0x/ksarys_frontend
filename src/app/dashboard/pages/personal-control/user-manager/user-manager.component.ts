import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/system-user.interface';
import { LoadingDataComponent } from '../../../../common/loading-data/loading-data.component';
import { EmptyListComponent } from '../../../../common/empty-list/empty-list.component';
import { Environments } from '../../../../environments/env';

@Component({
  selector: 'app-user-manager',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingDataComponent,
    EmptyListComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserManagerComponent implements OnInit {

  private userService = inject(UserService);
  private fb = inject(FormBuilder);
  private cdRef = inject(ChangeDetectorRef);

  loading_data: boolean | undefined = true;

  public roles = Environments.roles;
  roles_list = Object.entries(this.roles);

  public userList: User[] = [];
  public userForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.minLength(3)]],
    ClaveAcceso: ['', [Validators.required, Validators.minLength(5)]],
    NivelAcceso: [10, Validators.required],
    Cargo: ['Invitado', [Validators.required, Validators.minLength(5)]],
    Correo: ['', [Validators.required, Validators.minLength(5)]]
  });

  ngOnInit(): void {
    this.refreshUserList();
  }

  onSubmit() {
    Swal.fire({
      title: "Estás seguro?",
      text: "Desea crear un usuario con la información antes brindada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.saveUser(this.userForm.value).subscribe(
          response => {
            if (!response.success) {
              Swal.fire('Registro de Usuarios',
              response.api_message, 'error');
              return;
            }
            
            this.refreshUserList();
          }
        );
      }
    });
  }

  changeActive(user: User) {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción cambiará el acceso al sistema de este usuario.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cámbialo!"
    }).then((result) => {
      if (result.isConfirmed) {
        const modify: User = {...user, Activo: !user.Activo }
        this.userService.changeActive(modify).subscribe(
          success => {
            if (success) {
              this.refreshUserList();
            }
          }
        )
      }
    });
  } 

  deleteUser(id: number) {
    Swal.fire({
      title: "Estás seguro?",
      text: "Ésta acción eliminará por completo al usuario del sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(id).subscribe(
          success => {
            if (success) {
              this.refreshUserList();
            }
          }
        )
      }
    });
  }

  refreshUserList() {
    this.userService.getAllUsers().subscribe(
      list => {
        if (list.length !== 0) {
          this.loading_data = false;
          this.userList = list;
        } else {
          this.loading_data = undefined;
        }
        this.cdRef.detectChanges();
      }
    )
  }

  onChangeCat() {
    const select = document.getElementById("role-types") as HTMLSelectElement;
    const access_level =
      Object.entries(this.roles)
        .find(([key]) => key === select.value)![1];
    
    this.userForm.controls['NivelAcceso'].setValue(access_level);
    this.userForm.controls['Cargo'].setValue(select.value);
  }

  putTuEdit(user: User) {
    this.userForm.controls['Nombre'].setValue(user.Nombre)
    this.userForm.controls['Correo'].setValue(user.Correo)
    this.userForm.controls['Cargo'].setValue(user.Cargo)
  }

}

