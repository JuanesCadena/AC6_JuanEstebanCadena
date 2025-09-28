import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  viewDetail(userId: number): void {
    this.router.navigate(['/user', userId]);
  }

  editUser(user: any): void {

    this.router.navigate(['/edit-user', user.id]);
  }

  deleteUser(user: any): void {
    if (confirm(`¿Estás seguro que quieres eliminar al usuario ${user.username}?`)) {
      this.userService.deleteUser(user.id).subscribe(() => {
        alert('Usuario eliminado correctamente');
        this.users = this.users.filter(u => u.id !== user.id);
      });
    }
  }
}
