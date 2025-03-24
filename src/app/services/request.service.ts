import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private AuthService: AuthService) { }
  getUserRequestStatus(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.AuthService.getToken()}`);
    return this.http.get<any>(`${this.apiUrl}/Requests/my-request`, { headers });
  }
  // getPresignedUrl(file: File): Promise<string | null> {
  //   return lastValueFrom(
  //     this.http.get<{ url: string }>(`${this.apiUrl}/UploadFile/upload-url`, {
  //       params: { fileName: file.name, contentType: file.type }
  //     })
  //   ).then(response => response?.url || null)
  //   .catch(error => {
  //     console.error('שגיאה בקבלת Presigned URL:', error);
  //     return null;
  //   });
  // } 
  // /* מעלה קובץ ל-S3 */
  // uploadToS3(presignedUrl: string, file: File, onProgress: (progress: number) => void): Promise<string | null> {
  //   return new Promise((resolve, reject) => {
  //     this.http.put(presignedUrl, file, {
  //       headers: { 'Content-Type': file.type },
  //       reportProgress: true,
  //       observe: 'events'
  //     }).subscribe({
  //       next: (event) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           const progress = Math.round((event.loaded * 100) / (event.total || 1));
  //           onProgress(progress);
  //         } else if (event.type === HttpEventType.Response) {
  //           resolve(presignedUrl.split('?')[0]); // מחזיר את ה-URL של הקובץ ב-S3
  //         }
  //       },
  //       error: (error) => {
  //         console.error('שגיאה בהעלאה ל-S3:', error);
  //         reject(error);
  //       }
  //     });
  //   });
  // }
  /* מעלה קובץ ל-S3 */
 uploadToS3 (presignedUrl: string, file: File, onProgress: (progress: number) => void): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.http.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type },
        reportProgress: true,
        observe: 'events'
      }).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const progress = Math.round((event.loaded * 100) / (event.total || 1));
            onProgress(progress);
          } else if (event.type === HttpEventType.Response) {
            const url = new URL(presignedUrl);
            const fileKey = url.pathname.substring(1); 
            console.log(fileKey);
            // מסיר את ה-/ הראשון
            resolve(fileKey);
            //resolve(presignedUrl.split('?')[0]); // מחזיר את ה-URL של הקובץ ב-S3
          }
        },
        error: (error) => {
          console.error('שגיאה בהעלאה ל-S3:', error);
          reject(error);
        }
      });
    });
  }
  getPresignedUrl(file: File, userId: string): Promise<string | null> {
    return lastValueFrom(
      this.http.get<{ url: string }>(`${this.apiUrl}/UploadFile/upload-url`, {
        params: { fileName: file.name, contentType: file.type, userId }
      })
    ).then(response => response?.url || null)
      .catch(error => {
        console.error('שגיאה בקבלת Presigned URL:', error);
        return null;
      });
  }
  /** שליחת בקשה לשרת עם פרטי הקבצים */
  sendRequest(data: any): Observable<any> {
    console.log(data);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.AuthService.getToken()}`);
    return this.http.post(`${this.apiUrl}/Requests/CreateRequest`, data, { headers });
  }
  getRequestStatus(requestId: string): Observable<any> {
    console.log("getRequestStatus", requestId);
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.AuthService.getToken()}`);
    return this.http.get<any>(`${this.apiUrl}/Requests/${requestId}`);
  }

}
