import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
// import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { AuthGuard } from './guards/auth.guard';
import { PropertyTaxDiscountInfoComponent } from './components/property-tax-discount-info/property-tax-discount-info.component';
import { SubmitRequestComponent } from './components/submit-request/submit-request.component';
import { RequestStatusComponent } from './components/request-status/request-status.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: SignupComponent },
    { path: 'application', component: PropertyTaxDiscountInfoComponent},
    { path: 'submit-request', component:SubmitRequestComponent,canActivate: [AuthGuard]},
    { path: 'request-status/:id', component:RequestStatusComponent,canActivate: [AuthGuard]},
    { path:'not-login', component: LoginComponent}  
];
