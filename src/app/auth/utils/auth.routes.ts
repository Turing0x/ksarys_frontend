import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { ChangePasswordComponent } from "./pages/change-password/change-password.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { RegisterComponent } from "./pages/register/register.component";

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'changepass',
    component: ChangePasswordComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
  },
  { path: '**', redirectTo: '' }
]