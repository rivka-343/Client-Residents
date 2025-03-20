import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = "https://localhost:7126/api";
 // private apiUrl = "https://server-property-tax.onrender.com/api"
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  login(userName: string, password: string): Observable<{ token: string; role: string }> {
   console.log("login");
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/Auth/login`, { userName, password })
      .pipe(
        tap(response => {
          console.log(response.token);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role', response.role);
        })
      );
  }
 
  register(user: { username: string;  password: string; idNumber: string; role:string}): Observable<{ token: string; userId: string }> {
    user.role="Resident";
    return this.http.post<{ token: string; userId: string }>(`${this.apiUrl}/auth/register`, user).
    pipe(tap(response => {
      console.log(response);
      console.log(user.username);
      console.log(user.password);
      this.login(user.username,user.password)
      .subscribe({
        next: (response) => {},
        error: (error) => {
            console.log("error",error);
        }
      });
      }));
  }
  saveToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  getToken(): string | null {    
    return sessionStorage.getItem('token');
  }
  getUserRole(): string {
    return sessionStorage.getItem('role') || "";
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}