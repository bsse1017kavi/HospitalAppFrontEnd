import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../models/patient';
import { Router } from '@angular/router';
import { Medicine } from '../models/medicine';
import { Prescription } from '../models/prescription';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService, private router: Router) { }

  patient : Patient;

  prescription : Prescription;

  patients : Patient[] = [];

  prescriptions : Prescription[] = [];

  medicines: Medicine[] = [];

  //medicineCollection : Medicine[][] = [];

  medicineMap = new Map();

  ngOnInit() {
    this.loadPatients();
    this.patient = new Patient();

    //this.loadMedicines(1);

    // this.patients.forEach(patient=>{
    //   this.prescription = new Prescription();
    //   this.prescription.patient = patient;
    //    this.prescription.medicines = this.loadMedicines(patient.id);
    //   this.prescriptions.push(this.prescription);
    //   console.log(patient.id);
    // })

  }

  loadPatients() {
    this.patientService.getAllPatients().subscribe(
      response => {
        //  this.patients = response;
        //  this.patients.forEach(patient=>{
        //  this.prescription = new Prescription();
        //  this.prescription.patient = patient;
        //  console.log("Id" + patient.id);
        //  this.loadMedicines(patient.id);
        //  console.log("Hii "+this.medicines.length);
        //  this.prescription.medicines = this.medicines;
        //  this.prescription.medicines = this.loadMedicines(this.prescription);
        //  this.loadMedicines(this.prescription);
        //  this.prescriptions.push(this.prescription);
        this.patients = response;
      });
  }


  // loadMedicines(prescription: Prescription) : any
  // {
  //   this.patientService.getMedicines(prescription.patient.id).subscribe(
  //     (response : any) =>
  //     {
  //       this.medicines = response;
  //       prescription.medicines = response;
  //     }
  //   )
  // }

  // loadMedicines(patientId : number) : any
  // {
  //   this.patientService.getMedicines(patientId).subscribe(
  //     (response : any) =>
  //     {
  //       this.medicines = response;
  //     }
  //   )
  // }

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
