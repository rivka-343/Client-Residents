import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon'
import { RequestData } from '../RequestData';



@Component({
  selector: 'app-submit-request',
  imports: [FormsModule, MatInputModule,
    MatButtonModule,
    MatProgressBarModule,MatTabsModule,MatIcon,ReactiveFormsModule ],
  templateUrl: './submit-request.component.html',
  styleUrl: './submit-request.component.css'
})

export class SubmitRequestComponent {
  form: FormGroup; // הוספת FormGroup
  files: File[] = new Array(4);
  s3Urls: string[] = new Array(4);
  progresses: number[] = new Array(4).fill(0);
  fileNames: string[] = new Array(4).fill('');
  documentTypes: number[] = [0, 1, 2, 3];

  @Output() requestSubmitted = new EventEmitter<Boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private RequestService: RequestService,
    private authSerrvice: AuthService,
    private fb: FormBuilder // הוספת FormBuilder
  ) {
    this.form = this.fb.group({
      fName: ['', Validators.required],
      lfName: ['', Validators.required],
      gmail: ['', [Validators.required, Validators.email]],
      homeNumber: ['', Validators.required],
      street: ['', Validators.required],
      // city: ['', Validators.required],
      propertyNumber: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFormValid(): boolean {
    return this.form.valid && this.files.filter((file) => !!file).length === 4;
  }

  // handleFileChange(event: any, index: number) {
  //   this.files[index] = event.target.files[0];
  //   this.fileNames[index] = this.files[index]?.name || '';
  // }
  handleFileChange(event: any, index: number) {
    const file: File = event.target.files[0];
  
    if (file && !file.type.startsWith('image/')) {
      alert('ניתן להעלות רק קבצים מסוג תמונה (jpg, png, webp וכו\')');
      this.files[index] = undefined!;
      this.fileNames[index] = '';
      return;
    }
  
    this.files[index] = file;
    this.fileNames[index] = file?.name || '';
  }
  
  async handleUpload() {
    for (let i = 0; i < 4; i++) {
      if (this.files[i]) {
        try {
          const userId = this.authSerrvice.getUserIdFromToken() || '';
          console.log(userId);
          const presignedUrl = await this.RequestService.getPresignedUrl(
            this.files[i],
            userId
          );
          if (presignedUrl) {
            this.s3Urls[i] =
              (await this.RequestService.uploadToS3(
                presignedUrl,
                this.files[i],
                (progress) => {
                  this.progresses[i] = progress;
                }
              )) || '';
          }
        } catch (error) {
          console.error('שגיאה בהעלאת קובץ:', error);
        }
      }
    }
    if (this.s3Urls.filter((url) => url).length === 4) {
      this.sendRequest();
    }
  }
  sendRequest() {
    if (!this.form.valid) {
      alert('יש למלא את כל השדות הנדרשים בצורה תקינה.');
      return;
    }
  
    console.log('שליחת הבקשה...');
    const requestData: RequestData = {
      ...this.form.value,
      documentUploads: this.files.map((file, index) => ({
        fileName: file?.name || '',
        contentType: file?.type || '',
        s3Url: this.s3Urls[index] || '',
        type: this.documentTypes[index],
      })),
    };
  
    this.RequestService.sendRequest(requestData).subscribe({
      next: () => {
        alert('הבקשה נשלחה בהצלחה!');
        this.requestSubmitted.emit(true);
        this.router.navigate(['/application']);
      },
      error: (error) => {
        console.error('שגיאה בשליחת הבקשה:', error);
  
        // אם יש שגיאת 400 - מציגים למשתמש הודעה מהשרת
        if (error.status === 400 && error.error) {
          alert(`שגיאה: ${error.error}`);
        } else {
          alert('אירעה שגיאה בלתי צפויה בעת שליחת הבקשה. אנא נסה שוב מאוחר יותר.');
        }
  
        // *** כאן חשוב: לא נוגעים ב-form או בקבצים! ***
        // כדי לא לאבד נתונים ולתת למשתמש לתקן ולשלוח שוב
      },
    });
  }
  
  // sendRequest() {
  //   if (!this.form.valid) {
  //     alert('יש למלא את כל השדות הנדרשים בצורה תקינה.');
  //     return;
  //   }

  //   console.log('שליחת הבקשה...');
  //   const requestData: RequestData = {
  //     ...this.form.value,
  //     documentUploads: this.files.map((file, index) => ({
  //       fileName: file?.name || '',
  //       contentType: file?.type || '',
  //       s3Url: this.s3Urls[index] || '',
  //       type: this.documentTypes[index],
  //     })),  
  //   };
  //   console.log(requestData);

  //   this.RequestService.sendRequest(requestData).subscribe({
  //     next: () => {
  //       this.requestSubmitted.emit(true);
  //       this.router.navigate(['/application']);
  //       alert('הבקשה נשלחה בהצלחה!');
  //     },
  //     error: (error) => console.error('שגיאה בשליחת הבקשה:', error),
  //   });
  // }
}
//   files: File[] = new Array(4);
//   s3Urls: string[] = new Array(4);
//   progresses: number[] = new Array(4).fill(0);
//   fileNames: string[] = new Array(4).fill(''); // הוספה כאן
//   fName: string = '';
//   lfName: string = '';
//   gmail: string = '';
//   homeNumber: string = '';
//   street: string = '';
//   city: string = '';
//   propertyNumber: string = '';
//   documentTypes: number[] = [0, 1, 2, 3];

//   @Output() requestSubmitted = new EventEmitter<Boolean>();

//   constructor(
//     private router: Router,
//     private http: HttpClient,
//     private RequestService: RequestService,
//     private authSerrvice: AuthService
//   ) {}
//   isFormValid(): boolean {
//     return (
//       this.fName.trim().length > 0 &&
//       !!this.lfName &&
//       !!this.gmail &&
//       !!this.homeNumber &&
//       !!this.street &&
//       !!this.city &&
//       !!this.propertyNumber &&
//       this.files.filter(file => !!file).length === 4 // Check if all files are selected
//     );
    
//   }
//   handleFileChange(event: any, index: number) {
//     this.files[index] = event.target.files[0];
//     this.fileNames[index] = this.files[index]?.name || ''; // הוספה כאן
//   }

//   async handleUpload() {
//     for (let i = 0; i < 4; i++) {
//       if (this.files[i]) {
//         try {
//           const userId = this.authSerrvice.getUserIdFromToken() || '';
//           console.log(userId);
//           const presignedUrl = await this.RequestService.getPresignedUrl(
//             this.files[i],
//             userId
//           );
//           if (presignedUrl) {
//             this.s3Urls[i] =
//               (await this.RequestService.uploadToS3(
//                 presignedUrl,
//                 this.files[i],
//                 (progress) => {
//                   this.progresses[i] = progress;
//                 }
//               )) || '';
//           }
//         } catch (error) {
//           console.error('שגיאה בהעלאת קובץ:', error);
//         }
//       }
//     }
//     if (this.s3Urls.filter((url) => url).length === 4) {
//       this.sendRequest();
//     }
//   }

//   sendRequest() {
//     console.log('שליחת הבקשה...');
//     const requestData: RequestData = {
//       fName: this.fName,
//       lfName: this.lfName,
//       gmail: this.gmail,
//       homeNumber: this.homeNumber,
//       street: this.street,
//       city: this.city,
//       propertyNumber: this.propertyNumber,
//       documentUploads: this.files.map((file, index) => ({
//         fileName: file?.name || '',
//         contentType: file?.type || '',
//         s3Url: this.s3Urls[index] || '',
//         type: this.documentTypes[index], // Use the correct DocumentType
//       })),
//     };

//     this.RequestService.sendRequest(requestData).subscribe({
//       next: () => {
//         this.requestSubmitted.emit(true);
//         this.router.navigate(['/application']);
//         alert('הבקשה נשלחה בהצלחה!');
//       },
//       error: (error) => console.error('שגיאה בשליחת הבקשה:', error),
//     });
//   }
// }
//   files: File[] = new Array(4);
//   s3Urls: string[] = new Array(4);
//   progresses: number[] = new Array(4).fill(0);
//   fName: string = '';
//   lfName: string = '';
//   gmail: string = '';
//   homeNumber: string = '';
//   street: string = '';
//   city: string = '';
//   propertyNumber: string = '';
//   documentTypes: number[] = [0, 1, 2, 3]; // DocumentType values

//   @Output() requestSubmitted = new EventEmitter<Boolean>();

//   constructor(private router: Router, private http: HttpClient, private RequestService: RequestService, private authSerrvice: AuthService) { }

//   handleFileChange(event: any, index: number) {
//     this.files[index] = event.target.files[0];
//   }

//   async handleUpload() {
//     for (let i = 0; i < 4; i++) {
//       if (this.files[i]) {
//         try {
//           const userId = this.authSerrvice.getUserIdFromToken() || '';
//           console.log(userId);
//           const presignedUrl = await this.RequestService.getPresignedUrl(this.files[i], userId);
//           if (presignedUrl) {
//             this.s3Urls[i] = await this.RequestService.uploadToS3(presignedUrl, this.files[i], progress => {
//               this.progresses[i] = progress;
//             }) || '';
//           }
//         } catch (error) {
//           console.error('שגיאה בהעלאת קובץ:', error);
//         }
//       }
//     }
//     if (this.s3Urls.filter(url => url).length === 4) {
//       this.sendRequest();
//     }
//   }

//   sendRequest() {
//     console.log("שליחת הבקשה...");
//     const requestData: RequestData = {
//       fName: this.fName,
//       lfName: this.lfName,
//       gmail: this.gmail,
//       homeNumber: this.homeNumber,
//       street: this.street,
//       city: this.city,
//       propertyNumber: this.propertyNumber,
//       documentUploads: this.files.map((file, index) => ({
//         fileName: file?.name || '',
//         contentType: file?.type || '',
//         s3Url: this.s3Urls[index] || '',
//         type: this.documentTypes[index], // Use the correct DocumentType
//       })),
//     };

//     this.RequestService.sendRequest(requestData).subscribe({
//       next: () => {
//         this.requestSubmitted.emit(true);
//         this.router.navigate(['/application']);
//         alert('הבקשה נשלחה בהצלחה!');
//       },
//       error: (error) => console.error('שגיאה בשליחת הבקשה:', error),
//     });
//   }


// }
