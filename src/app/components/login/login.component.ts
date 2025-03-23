import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,MatFormFieldModule,
            MatInputModule,MatButtonModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {    
     if (this.loginForm.invalid) return;
    const { userName, password } = this.loginForm.value;
    this.authService.login(userName, password).subscribe({
      next: (response) => {  
      //  this.authService.saveToken(response.token);
      //  sessionStorage.setItem('token', response.token);
       this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = 'אימייל או סיסמה שגויים';
      }
    });
  }
}