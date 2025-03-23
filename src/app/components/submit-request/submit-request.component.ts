import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-submit-request',
  imports: [FormsModule],
  templateUrl: './submit-request.component.html',
  styleUrl: './submit-request.component.css'
})
export class SubmitRequestComponent {
  files: File[] = new Array(4);
  s3Urls: string[] = new Array(4);
  progresses: number[] = new Array(4).fill(0);
  field1: string = '';
  field2: string = '';
  @Output() requestSubmitted = new EventEmitter<Boolean>();

  constructor(private router: Router,private http: HttpClient,private RequestService: RequestService) {}

  handleFileChange(event: any, index: number) {
    this.files[index] = event.target.files[0];
  }


  async handleUpload() {
    for (let i = 0; i < 4; i++) {
      if (this.files[i]) {
        try {
          const presignedUrl = await this.RequestService.getPresignedUrl(this.files[i]);
          if (presignedUrl) {
            this.s3Urls[i] = await this.RequestService.uploadToS3(presignedUrl, this.files[i], progress => {
              this.progresses[i] = progress;
            }) || '';
          }
        } catch (error) {
          console.error('שגיאה בהעלאת קובץ:', error);
        }
      }
    }
    if (this.s3Urls.filter(url => url).length === 4) {
      this.sendRequest();
    }
  }

  sendRequest() {
    console.log("שליחת הבקשה...");
    const requestData = {
      propertyNumber: this.field1,
      averageMonthlyIncome: this.field2,
      documentUploads: this.files.map((file, index) => ({
        fileName: file?.name,
        contentType: file?.type,
        s3Url: this.s3Urls[index],
      })),
    };

    this.RequestService.sendRequest(requestData).subscribe({
      next: () =>{
         alert('הבקשה נשלחה בהצלחה!');
         this.requestSubmitted.emit(true);
         this.router.navigate(['/application']);
      },
      error: (error) => console.error('שגיאה בשליחת הבקשה:', error),
    });
  }
  

}
