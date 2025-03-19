import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,MatCardModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registerForm: FormGroup;
   constructor( private fb: FormBuilder, private authService: AuthService, private router: Router ) 
   { this.registerForm = this.fb.group({
       username: ['', Validators.required], 
       password: ['', [Validators.required,  Validators.minLength(8),  Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/)       ]],
       idNumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
     });
    }
    onSubmit() {
      if (this.registerForm.valid) {
        const { username,  password, idNumber,role="Resident" } = this.registerForm.value;
        this.authService.register({ username, password,idNumber, role }).subscribe({
          next: (res) => {
            this.authService.saveToken(res.token);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Registration failed', err);
          }
        });
      }
    }
  }