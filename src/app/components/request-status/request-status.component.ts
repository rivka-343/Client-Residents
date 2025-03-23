import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-request-status',
  imports: [],
  templateUrl: './request-status.component.html',
  styleUrl: './request-status.component.css'
})
export class RequestStatusComponent implements OnInit {
  requestId: string | null = null;
  requestStatus: any; // כאן תוכל לשמור את המידע על הבקשה
  error: string | null = null;

  constructor(private route: ActivatedRoute,private RequestService: RequestService, private router: Router) { }

  ngOnInit(): void {
    console.log('RequestStatusComponent initialized');

    // קבלת מזהה הבקשה מה-URL
    this.route.paramMap.subscribe(params => {
      this.requestId = params.get('id'); // נניח שהמזהה נמצא ב-URL
      this.getRequestStatus();
    });
  }

  getRequestStatus(): void {
    console.log(this.requestId);
    if (this.requestId) {
      console.log('Fetching request status...');

      // this.RequestService.getRequestStatus(this.requestId).subscribe({
      //   next: (response) =>{
      //     this.requestStatus = response; // שמירת המידע שהתקבל
      //     console.log(this.requestStatus);
      //   },
      //   error: (error) => {
      //         this.error = 'שגיאה בטעינת סטטוס הבקשה'; // טיפול בשגיאה
      //         console.error('Error fetching request status', error);
      //       }
      // });


      this.RequestService.getRequestStatus(this.requestId).subscribe(
        response => {
          this.requestStatus = response; // שמירת המידע שהתקבל
          console.log(this.requestStatus); 
        },
        error => {
          this.error = 'שגיאה בטעינת סטטוס הבקשה'; // טיפול בשגיאה
          console.error('Error fetching request status', error);
        })}
      }

  viewDocument(url: string): void {
    // פתח את המסמך בחלון חדש
    window.open(url, '_blank');
  }
}
