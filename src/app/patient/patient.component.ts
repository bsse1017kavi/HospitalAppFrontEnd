import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../models/patient';
import { Router } from '@angular/router';
import { Medicine } from '../models/medicine';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService, private router: Router) { }

  patient : Patient;

  patients : Patient[] = [];

  medicines: Medicine[] = [];


  medicineMap = new Map();

  ngOnInit() {
    this.loadPatients();
    this.patient = new Patient();

  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe(
      response => {
        this.patients = response;
      });
  }


  addPatient() : void
  {
    this.patientService.addPatient(this.patient).subscribe(
      (response: any) =>
      {
        //alert(response);
        this.patientService.formModel.reset();
        this.loadPatients();
        this.patient = new Patient();
      }
    )
  }

  deletePatient(patientId : number) : void
  {
    this.patientService.deletePatient(patientId).subscribe(
      (response: any) =>
      {
        this.loadPatients();
      }
    )
  }

  editPatient(patient : Patient) : void
  {
    this.patientService.patientForUpdate = patient;
    this.router.navigate(['/patient-update']);
  }

  viewPrescription(patient: Patient) : void
  {
    this.patientService.patientForPrescription = patient;
    this.router.navigate(['/prescription']);
  }

}
