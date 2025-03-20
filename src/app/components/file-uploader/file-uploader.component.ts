import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../services/request.service'
@Component({
  selector: 'app-file-uploader',
  imports: [FormsModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {
  files: File[] = new Array(4);
  s3Urls: string[] = new Array(4);
  progresses: number[] = new Array(4).fill(0);
  field1: string = '';
  field2: string = '';
  constructor(private http: HttpClient,private RequestService: RequestService) {}

  handleFileChange(event: any, index: number) {
    this.files[index] = event.target.files[0];
  }

  // async handleUpload() {
  //   for (let i = 0; i < 4; i++) {
  //     if (this.files[i]) {
  //       const presignedUrl = await this.getPresignedUrl(this.files[i]);
  //       if (presignedUrl) {
  //         await this.uploadToS3(presignedUrl, this.files[i], i);
  //       }
  //     }
  //   }
  // }
  // async getPresignedUrl(file: File): Promise<string | null> {
  //   try {
  //     const response = await this.http.get<{ url: string }>('https://localhost:7126/api/UploadFile/upload-url', {
  //       params: { fileName: file.name, contentType: file.type },
  //     }).toPromise();
  //     if (response && response.url) {
  //       console.log("acsept url from api");
  //       return response.url;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error('שגיאה בקבלת Presigned URL:', error);
  //     return null;
  //   }
  // }

  // async uploadToS3(presignedUrl: string, file: File, index: number) {
  //   try {
  //     await this.http.put(presignedUrl, file, {
  //       headers: { 'Content-Type': file.type },
  //       reportProgress: true,
  //       observe: 'events',
  //     }).toPromise().then((event: any) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progresses[index] = Math.round((event.loaded * 100) / (event.total || 1));
  //       } else if (event.type === HttpEventType.Response) {
  //         this.s3Urls[index] = presignedUrl.split('?')[0];
  //         if (this.s3Urls.filter(url => url).length === 4) {
  //           this.sendRequest();
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error('שגיאה בהעלאה ל-S3:', error);
  //   }
  // }

  // sendRequest() {
  //   console.log("send request");
    
  //   const requestData = {
  //     propertyNumber: this.field1,
  //     averageMonthlyIncome: this.field2,
  //     documentUploads: this.files.map((file, index) => ({
  //       fileName: file?.name,
  //       contentType: file?.type,
  //       s3Url: this.s3Urls[index],
  //     })),
  //   };

  //   this.http.post('https://localhost:7126/api/Requests/CreateRequest', requestData).subscribe({
  //     next: (response) => {
  //       alert('הבקשה נשלחה בהצלחה!');
  //     },
  //     error: (error) => {
  //       console.error('שגיאה בשליחת הבקשה:', error);
  //     },
  //   });
  // }

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
      next: () => alert('הבקשה נשלחה בהצלחה!'),
      error: (error) => console.error('שגיאה בשליחת הבקשה:', error),
    });
  }
  
}
  // file: File | null = null;
  // progress = 0;
  // fileName: string = '';

  // constructor(private http: HttpClient) {}

  // handleFileChange(event: any) {
  //   if (event.target.files) {
  //     this.file = event.target.files[0];
  //   }
  // }

  // handleUpload() {
  //   if (!this.file) return;
  //   //api/UploadFile/
  //   this.http
  //     .get<{ url: string }>('https://localhost:7126/api/UploadFile/upload-url', {
  //       params: { fileName: this.file.name,contentType:this.file.type },
  //     })
  //     .subscribe({
  //       next: (response) => {     
  //         console.log("acsept url from api",response.url);
               
  //         this.uploadToS3(response.url);
  //       },
  //       error: (error) => {
  //         console.error('שגיאה בקבלת Presigned URL:', error);
  //       },
  //     });
  // }

  // uploadToS3(presignedUrl: string) {
  //   this.http
  //     .put(presignedUrl, this.file, {
  //       headers: {
  //         'Content-Type': this.file!.type,
  //       },
  //       reportProgress: true,
  //       observe: 'events',
  //     })
  //     .subscribe({
  //       next: (event: any) => {
  //         if (event.type === HttpEventType.UploadProgress) {
  //           this.progress = Math.round((event.loaded * 100) / (event.total || 1));
  //         } else if (event.type === HttpEventType.Response) {
  //           alert('הקובץ הועלה בהצלחה!');
  //         }
  //       },
  //       error: (error) => {
  //         console.error('שגיאה בהעלאה ל-S3:', error);
  //       },
  //     });
  // } 
//   onFileSelected(event: any) {
//     this.file = event.target.files[0];
//   }

//   handleDunload() {
//     if (!this.fileName) return;
//     https://localhost:7126/api/UploadFile/download-url
//     //api/UploadFile/
//     this.http
//       .get<{ url: string }>(`https://localhost:7126/api/UploadFile/download-url/${this.fileName}`)
//       .subscribe({
//         next: (response) => {          
//           this.DunloadFromS3(response.url);
//         },
//         error: (error) => {
//           console.error('שגיאה בקבלת Presigned URL:', error);
//         },
//       });
//   }

//   DunloadFromS3(presignedUrl: string) {
//     // this.http
//     // .put(presignedUrl, this.file, {
//     //   headers: {
//     //     'Content-Type': this.file!.type,
//     //   },
//     //   reportProgress: true,
//     //   observe: 'events',
//     // })
//     // .subscribe({
//     //   next: (event: any) => {
//     //     if (event.type === HttpEventType.UploadProgress) {
//     //       this.progress = Math.round((event.loaded * 100) / (event.total || 1));
//     //     } else if (event.type === HttpEventType.Response) {
//     //       alert('הקובץ הועלה בהצלחה!');
//     //     }
//     //   },
//     //   error: (error) => {
//     //     console.error('שגיאה בהעלאה ל-S3:', error);
//     //   },
//     // });
//       this.http.get(presignedUrl, { responseType: 'blob' }).subscribe({
//         next: (blob: Blob) => {
//           console.log(blob);

//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           console.log(a);

//           a.href = url;
//           a.download = this.fileName;
//           a.click();
//           window.URL.revokeObjectURL(url);
//         },
//         error: (error) => {
//           console.error('Error downloading file:', error);
//         },
//       });
//   }
 //}