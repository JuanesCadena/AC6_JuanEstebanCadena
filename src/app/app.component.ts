import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
      <div class="container-fluid">
        <!-- Logo a la izquierda -->
        <a class="navbar-brand" routerLink="/home">
          <img src="https://cdn.worldvectorlogo.com/logos/le-chat-de-l-le-de-nantes.svg" alt="Logo" class="logo">
        </a>

        <!-- Botón para móviles -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Links a la derecha -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/newuser">Nuevo Usuario</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .custom-navbar {
      padding: 0.5rem 1rem;
    }

    .logo {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .nav-link {
      transition: color 0.3s;
      color: #000;
    }

    .nav-link:hover {
      color: red !important;
    }
  `]
})
export class AppComponent {}
