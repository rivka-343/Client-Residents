import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-property-tax-discount-info',
  imports: [],
  templateUrl: './property-tax-discount-info.component.html',
  styleUrl: './property-tax-discount-info.component.css'
})
export class PropertyTaxDiscountInfoComponent implements OnInit {
    hasActiveRequest: boolean = false;
    isLoading: boolean = true; // משתנה מצב לטעינה
    idRequest: string | null = null; // מזהה הבקשה  

    constructor(private router: Router, private requestService: RequestService) {}
    onRequestSubmitted(data: boolean): void {
      console.log('Request submitted:', data);
      this.hasActiveRequest = data;
    }
    ngOnInit(): void {
      // קריאה לשירות לבדוק אם קיימת בקשה פתוחה
      this.requestService.getUserRequestStatus().subscribe(
        response => {
            // אם יש בקשה, הצג כפתור לצפיה בבקשה
            this.idRequest=response.id;
            this.hasActiveRequest = true; // דגל המצב של הבקשה
            this.isLoading = false; // סיום הטעינה
        },
        error => {
            if (error.status === 404) {
                // אם לא נמצאה בקשה, הצג כפתור להגשת בקשה
                this.hasActiveRequest = false; // דגל המצב של הבקשה
            } else {
                // טיפול בשגיאות אחרות אם יש צורך
                console.error('Error fetching request status', error);
            }
            this.isLoading = false; // סיום הטעינה

        }
    );

    }
  
    handleAction(): void {
      console.log('Action button clicked',this.hasActiveRequest);
      
      if (this.hasActiveRequest) {
        // ניווט לדף הצגת סטטוס הבקשה

        this.router.navigate(['/request-status/'+this.idRequest]);
      } else {
        // ניווט לדף הגשת בקשה
        this.router.navigate(['/submit-request']);
      }
    }
  
}
