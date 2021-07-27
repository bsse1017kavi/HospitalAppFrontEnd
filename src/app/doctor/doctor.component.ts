import { Component, OnInit } from '@angular/core';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.doctorService.getAllDoctors().subscribe(
      response => {
        this.doctors = response;
      }
    );
  }

  deleteAccount(student:Doctor){
    
  }

  editStudentInfo(student: Doctor){
    
  }

}
