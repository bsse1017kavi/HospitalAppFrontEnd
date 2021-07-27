import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCard} from '@angular/material/card';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorService } from './doctor.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { PatientService } from './patient.service';
import { PatientComponent } from './patient/patient.component';
import { MatMenuModule } from '@angular/material/menu';

import {JwtModule} from '@auth0/angular-jwt';
import { AuthGuardService } from './guards/auth-guard.service';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { MedicineComponent } from './medicine/medicine.component';
import { MedicineService } from './medicine.service';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MedicineUpdateComponent } from './medicine-update/medicine-update.component';
import { HomepageComponent } from './homepage/homepage.component';

export function tokenGetter()
{
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MatCard,
    DoctorComponent,
    routingComponents,
    RegistrationComponent,
    LogInComponent,
    PatientComponent,
    PatientUpdateComponent,
    MedicineComponent,
    PrescriptionComponent,
    MedicineUpdateComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: 
  [
    DoctorService, PatientService, AuthGuardService, MedicineService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
