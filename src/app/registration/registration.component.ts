import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  text: string="This is a text";
  confirmPassword: string;
  doctor: Doctor;

  constructor(public service: DoctorService, public router: Router) { }

  ngOnInit() {
    this.doctor = new Doctor();
  }

  addDoctor() : void
  {
    this.service.addDoctor(this.doctor).subscribe(
      (response: any) =>
      {
        this.service.formModel.reset();
        this.router.navigate(["/home"]);
        this.doctor = new Doctor();
      }
    )
  }

}
