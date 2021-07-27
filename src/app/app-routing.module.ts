import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { DoctorComponent } from './doctor/doctor.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogInComponent } from './log-in/log-in.component';
import { PatientComponent } from './patient/patient.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { MedicineUpdateComponent } from './medicine-update/medicine-update.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = 
[
    {path: 'doctor', component:DoctorComponent},
    {path: 'registration', component:RegistrationComponent},
    {path: 'log-in', component:LogInComponent},
    {path: 'patient', component:PatientComponent, canActivate: [AuthGuardService]},
    {path: 'patient-update', component:PatientUpdateComponent, canActivate: [AuthGuardService]},
    {path: 'medicine', component:MedicineComponent, canActivate: [AuthGuardService]},
    {path: 'prescription', component:PrescriptionComponent, canActivate: [AuthGuardService]},
    {path: 'medicine-update', component:MedicineUpdateComponent, canActivate: [AuthGuardService]},
    {path: 'home', component:HomepageComponent}
];

@NgModule
(
    {
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    }
)

export class AppRoutingModule {}
export const routingComponents = [DoctorComponent, RegistrationComponent,
     LogInComponent, PatientComponent, PatientUpdateComponent, MedicineComponent, PrescriptionComponent,
    MedicineUpdateComponent, HomepageComponent]