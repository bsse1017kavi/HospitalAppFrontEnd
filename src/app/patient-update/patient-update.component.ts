import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit() {
  }

  updatePatient()
  {
    this.patientService.updatePatient().subscribe(
      (response: any) =>
      {
        this.router.navigate(['/patient']);
      }
    )
  }

}
