import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUser(userId).subscribe((data: any) => {
      this.user = data;
    });
  }

  deleteUser(user: any) {
    if (confirm(`¿Estás seguro que quieres eliminar al usuario ${user.username}?`)) {
      this.userService.deleteUser(user.id).subscribe(() => {
        alert('Usuario eliminado correctamente');
        this.router.navigate(['/home']);
      });
    }
  }

  editUser(user: any) {

    this.router.navigate(['/edit-user', user.id]);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
