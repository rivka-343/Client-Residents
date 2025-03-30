import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon'
import { RequestData } from '../RequestData';
import { log } from 'console';

@Component({
  selector: 'app-request-status',
  imports: [MatInputModule,MatCardModule,
    MatButtonModule,
    MatProgressBarModule,MatTabsModule,MatIcon],
  templateUrl: './request-status.component.html',
  styleUrl: './request-status.component.css'
})
export class RequestStatusComponent implements OnInit {
  requestId: string | null = null;
  requestStatus: RequestData | undefined;
  error: string | null = null;
  isLoading = true; // משתנה שיציין אם הנתונים נטענים

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService ,private router: Router) {
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.requestId = params.get('id');
      if (this.requestId) {
        this.getRequestData();
      } else {
        this.error = 'מזהה בקשה לא תקין';
        this.isLoading = false;
      }
    });
  }

  async getRequestData(): Promise<void> {
    try {

      this.requestStatus = await this.requestService.getRequestStatus(this.requestId!).toPromise();
      if (this.requestStatus) {
        console.log(this.requestStatus);
        let res = await this.requestService.getDocuments(this.requestId!).toPromise();
        this.requestStatus.documentUploads = res.files;
        console.log(this.requestStatus.documentUploads);
        
      }
    } catch (error) {
      console.error('Error fetching request data', error);
      this.error = 'שגיאה בטעינת נתוני הבקשה';
    } finally {
      this.isLoading = false;
    }
  }

  viewDocument(url: string): void {
    window.open(url, '_blank');
  }
//   requestId: string | null = null;
//   requestStatus: RequestData  | undefined; // כאן תוכל לשמור את המידע על הבקשה
//   error: string | null = null;
//   constructor(private route: ActivatedRoute, private RequestService: RequestService, private router: Router) { }

//   ngOnInit(): void {
//     console.log('RequestStatusComponent initialized');
//     this.route.paramMap.subscribe(params => {
//       this.requestId = params.get('id'); // נניח שהמזהה נמצא ב-URL
//       this.getRequestStatus();
//     });
//   }

//   getRequestStatus(): void {
//     console.log(this.requestId);
//     if (this.requestId) {
//       console.log('Fetching request status...');
//       this.RequestService.getRequestStatus(this.requestId).subscribe(
//         response => {
//           this.requestStatus = response; // שמירת המידע שהתקבל
//           console.log(this.requestStatus);
//         },
//         error => {
//           this.error = 'שגיאה בטעינת סטטוס הבקשה'; // טיפול בשגיאה
//           console.error('Error fetching request status', error);
//         })
//         this.RequestService.getDocuments(this.requestId).subscribe(
//           response => {
//             if (this.requestStatus) {
//             this.requestStatus.documentUploads = response; }
//           },
//           error => {
//             this.error = 'שגיאה בטעינת מסמכי הבקשה'; // טיפול בשגיאה
//             console.error('Error fetching request status', error);
//           })
//     }
//   }


//   viewDocument(url: string): void {
//     // פתח את המסמך בחלון חדש
//     window.open(url, '_blank');
//   }
}
