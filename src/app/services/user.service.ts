import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: any[] = [];

  constructor() {
    // Cargar de localStorage si existe
    const stored = localStorage.getItem('users');
    if (stored) {
      this.users = JSON.parse(stored);
    }
  }

  private saveToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  // Obtener un usuario por id
  getUser(id: string): Observable<any> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }

  // Crear usuario
  createUser(user: any): Observable<any> {
    user.id = Date.now().toString(); // ID único
    this.users.push(user);
    this.saveToStorage();
    return of(user);
  }

  // Actualizar usuario
  updateUser(id: string, updatedUser: any): Observable<any> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      this.saveToStorage();
    }
    return of(this.users[index]);
  }

  // Eliminar usuario
  deleteUser(id: string): Observable<any> {
    this.users = this.users.filter(u => u.id !== id);
    this.saveToStorage();
    return of(true);
  }
}
