import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../models/patient';
import { Medicine } from '../models/medicine';
import { MedicineService } from '../medicine.service';
import * as jspdf from 'jspdf';
//import * as html2pdf from 'html2pdf.js';
//import * as _html2canvas from "html2canvas";  
//import html2canvas from 'html2canvas';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  id : number;
  patient: Patient;
  medicines: Medicine[];
  addableMedicines: Medicine[];
  willBreak : boolean;

  constructor(private patientService: PatientService, private medicineService: MedicineService) { }

  ngOnInit() {
    this.patient = this.patientService.patientForPrescription;
    this.id = this.patient.id;
    this.loadMedicines(this.id);
    this.loadAddableMedicines();
  }

  loadMedicines(patientId : number) : any
  {
    this.patientService.getMedicines(patientId).subscribe(
      (response : any) =>
      {
        this.medicines = response;
      }
    )
  }

  contains(medicineId : number) : boolean
  {
    var contains: boolean = false;

    this.medicines.forEach(element => {
      if(element.id == medicineId)
      {
        contains = true;
      }
    });
    
    if(contains) return true;

    return false;
  } 

  loadAddableMedicines() {
    this.medicineService.getAllMedicines().subscribe(
      response => {
         this.addableMedicines = response;
        //alert(response);
      }
    );
  }

  addMedicineToPrescription(medicine: Medicine)
  {
    if(this.contains(medicine.id))
    {
      return;
    }

    console.log("Hello");

    this.patientService.addPatientMedicineRelation(this.id, medicine.id).subscribe(
      (response: any) =>
      {

      }
    );

    //this.loadMedicines(this.id);

    this.medicines.push(medicine);

  }

  deleteMedicineFromPrescription(medicine: Medicine)
  {
    if(this.contains(medicine.id))
    {
      this.patientService.deletePatientMedicineRelation(this.id, medicine.id).subscribe(
        (response : any)=>
        {

        }
      );

      for(let i=0;i<this.medicines.length;i++)
      {
        if(this.medicines[i].id == medicine.id)
        {
          this.medicines.splice(i, 1);
          return;
        }
      }

    }

    //this.loadMedicines(this.id);
  }

  public getString() : string
  {
    let date : Date = new Date();

    var doctorName = localStorage.getItem("doctorName");

    console.log(doctorName);

    var content = "Dr. " + doctorName + "\t\t\t\t\t\t\t\t\t" +  date.getDate() + "/" + date.getMonth() + "/" + date.getUTCFullYear() + "\n\n";

    content = content + "Patient Id: " + this.patient.id  + "\n" + 
      "Name: " + this.patient.name + "\n" + 
      "Age: " + this.patient.age + "\n\n" + "Medcines:\n";

    this.medicines.forEach(medicine=>{
      content = content + medicine.name + ", " + medicine.usage + "\n";
    })

    return content;

  }

  public generate()  
  {   

    var content = this.getString();

    var doc = new jspdf.jsPDF();

    doc.text(content , 20, 20);

    doc.save("Prescription.pdf");

  }  

}
