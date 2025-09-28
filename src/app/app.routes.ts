import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newuser', component: UserFormComponent },
  { path: 'edit-user/:id', component: UserFormComponent }, // Ruta para editar
  { path: 'user/:id', component: UserDetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
