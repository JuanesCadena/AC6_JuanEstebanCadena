import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isUpdate = false;
  userId: string | null = null;
  selectedImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/[^\s]+)$/), 
        ],
      ],
    });

   
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.isUpdate = true;
      this.userService.getUser(this.userId).subscribe((data: any) => {
        this.userForm.patchValue(data);
        this.selectedImage = data.image;
      });
    }
  }

  onImageChange(event: any): void {
    this.selectedImage = event.target.value;
  }

  submit(): void {
    if (this.userForm.invalid) return;

    if (this.isUpdate && this.userId) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/']);
      });
    } else {
      this.userService.createUser(this.userForm.value).subscribe(() => {
        alert('Usuario creado correctamente');
        this.router.navigate(['/']);
      });
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
